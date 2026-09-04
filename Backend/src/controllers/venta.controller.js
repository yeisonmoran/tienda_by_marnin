import prisma from "../config/db.js";


export async function listarVentas(req, res) {

    try {
        const ventas = await prisma.venta.findMany();
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al listar ventas" });
    }
}


export async function registrarVenta(req, res) {

    try {

        const { idCliente, idUsuario, metodoPago, detalles } = req.body;

        if (!idCliente) {
            return res.status(400).json({
                error: "El cliente es obligatorio"
            });
        }

        if (!idUsuario) {
            return res.status(400).json({
                error: "El usuario es obligatorio"
            });
        }

        if (!detalles || detalles.length === 0) {
            return res.status(400).json({
                error: "La venta debe tener un detalle"
            });
        }


        const productosConError = [];
        const productosEncontrados = [];

        for (const item of detalles) {

            const producto = await prisma.producto.findUnique({
                where: { id_producto: Number(item.idProducto) },
            });

            if (!producto) {
                productosConError.push({ idProducto: item.idProducto, motivo: "No existe" });

                continue;
            }

            if (producto.stock < item.cantidad) {
                productosConError.push({
                    idProducto: item.idProducto,
                    solicitado: item.cantidad,
                    disponible: producto.stock,
                });

                continue;
            }
            productosEncontrados.push({ producto, cantidad: item.cantidad });

        }

        if (productosConError.length > 0) {
            return res.status(409).json({
                error: "stock_insuficiente",
                productos: productosConError,
            });
        }

        let total = 0;

        const lineasDetalle = productosEncontrados.map(({ producto, cantidad }) => {
            const subtotal = Number(producto.precio) * cantidad;
            total += subtotal;

            return {
                idProducto: producto.id_producto,
                cantidad,
                precioUnitario: producto.precio,
                costoUnitario: producto.precioCompra,
                subtotal,
            };
        });

        const resultado = await prisma.$transaction(async (tx) => {
            const nuevaVenta = await tx.venta.create({
                data: {
                    idCliente: Number(idCliente),
                    idUsuario: Number(idUsuario),
                    fecha: new Date(),
                    total,
                    estado: "Completada",
                    metodoPago: metodoPago || "efectivo",
                },
            });

            for (const linea of lineasDetalle) {
                await tx.detalleVenta.create({
                    data: {
                        idVenta: nuevaVenta.id_venta,
                        idProducto: linea.idProducto,
                        cantidad: linea.cantidad,
                        precioUnitario: linea.precioUnitario,
                        costoUnitario: linea.costoUnitario,
                        subtotal: linea.subtotal,
                    },
                });

                await tx.producto.update({
                    where: { id_producto: linea.idProducto },
                    data: { stock: { decrement: linea.cantidad } },
                });

            }
            return nuevaVenta;
        });

        res.status(201).json(resultado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar venta" });
    }
}


export async function obtenerGananciaVenta(req, res) {

    try {
        const { id } = req.params;

        const detalles = await prisma.detalleVenta.findMany({
            where: { idVenta: Number(id) },
        });

        const ganancia = detalles.reduce((total, linea) =>{
            const gananciaLinea = (Number(linea.precioUnitario) - Number(linea.costoUnitario)) * linea.cantidad;
            return total + gananciaLinea;
        }, 0);

        res.json({ganancia});

    } catch (error) {

        console.error(error);
        res.status(500).json({error: "Error al calcular ganancia"});
    }
}


export async function anularVenta(req, res) {

    try {

        const { id } = req.params;

        const venta = await prisma.venta.findUnique({
            where: { id_venta: Number(id) },
            include: { detalles: true },
        });

        if (!venta) {

            return res.status(404).json({
                error: "No existe"
            });
        }

        if (venta.estado === "Anulada") {

            return res.status(400).json({
                error: "No hay venta por anular"
            });

        }

        const resultado = await prisma.$transaction(async (tx) => {
            for (const detalle of venta.detalles) {
                await tx.producto.update({
                    where: { id_producto: detalle.idProducto },
                    data: { stock: { increment: detalle.cantidad } },
                });

            }

            const ventaAnulada = await tx.venta.update({
                where: { id_venta: Number(id) },
                data: { estado: "Anulada" },

            });

            return ventaAnulada;
        });
        res.json(resultado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al anular venta" });
    }

}




