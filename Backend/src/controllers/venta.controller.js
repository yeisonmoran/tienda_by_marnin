import prisma from "../config/db.js";
import ExcelJS from "exceljs";


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
        const productosSinCosto = [];
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


            if (Number(producto.precioCompra) <= 0) {
                productosSinCosto.push({
                    idProducto: item.idProducto,
                    nombre: producto.nombre,
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

        if (productosSinCosto.length > 0) {
            return res.status(409).json({
                error: "productos_sin_costo",
                productos: productosSinCosto,
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
                costoUnitario: Number(producto.precioCompra),
                subtotal,
            };
        });

     
        const fechaComercial = new Date(
            new Date().toLocaleString("en-US", { timeZone: "America/Bogota" })
        );
        fechaComercial.setHours(0, 0, 0, 0);

        const resultado = await prisma.$transaction(async (tx) => {
            const nuevaVenta = await tx.venta.create({
                data: {
                    idCliente: Number(idCliente),
                    idUsuario: Number(idUsuario),
                    fecha: fechaComercial,
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

        const ganancia = detalles.reduce((total, linea) => {
            const gananciaLinea = (Number(linea.precioUnitario) - Number(linea.costoUnitario)) * linea.cantidad;
            return total + gananciaLinea;
        }, 0);

        res.json({ ganancia });

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error al calcular ganancia" });
    }
}

export async function obtenerVenta(req, res) {
    try {
        const { id } = req.params;

        const venta = await prisma.venta.findUnique({
            where: { id_venta: Number(id) },
            include: { detalles: true },
        });

        if (!venta) {

            return res.status(404).json({ error: "Venta no encontrada" });
        }

        const esAdmin = req.usuario.idRol === 1;

        if (esAdmin) {

            let gananciaTotal = 0;
            venta.detalles = venta.detalles.map(linea => {
                const ganancia = venta.estado === "Anulada"
                    ? 0
                    : (Number(linea.precioUnitario) - Number(linea.costoUnitario || 0)) * linea.cantidad;
                gananciaTotal += ganancia;
                return { ...linea, ganancia };
            });

            venta.gananciaTotal = gananciaTotal;
        } else {

            venta.detalles = venta.detalles.map(({ costoUnitario, ...resto }) => resto);
        }

        res.json(venta);

    } catch (error) {

        console.error(error);
        res.status(500).json({ error: "Error al obtener la venta" });

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


export async function exportarVentas(req, res) {

    try {
        const { fechaInicio, fechaFin } = req.query;

        if (!fechaInicio || !fechaFin) {
            return res.status(400).json({
                error: "Debe indicar fechaInicio y fechaFin"
            });
        }

        const inicio = new Date(`${fechaInicio}T00:00:00.000Z`);

        const fin = new Date(`${fechaFin}T00:00:00.000Z`);
        fin.setUTCDate(fin.getUTCDate() + 1);

        if (Number.isNaN(inicio.getTime()) || Number.isNaN(fin.getTime())) {
            return res.status(400).json({ error: "Fechas inválidas" });
        }

  
        const [ventas, clientes, usuarios, detalles] = await Promise.all([
            prisma.venta.findMany({
                where: { fecha: { gte: inicio, lt: fin } },
                orderBy: { fecha: "asc" },
            }),
            prisma.cliente.findMany(),
            prisma.usuario.findMany(),
            prisma.detalleVenta.findMany({
                where: {
                    venta: {
                        fecha: { gte: inicio, lt: fin },
                        estado: "Completada",
                    },
                },
            }),
        ]);

        const mapaClientes = new Map(
            clientes.map((cliente) => [cliente.id_cliente, cliente.nombre])
        );
        const mapaUsuarios = new Map(
            usuarios.map((usuario) => [usuario.id_usuario, usuario.nombre])
        );

       
        const idsProductos = [
            ...new Set(detalles.map((linea) => linea.idProducto)),
        ];
        const productos = await prisma.producto.findMany({
            where: { id_producto: { in: idsProductos } },
            select: { id_producto: true, precioCompra: true },
        });
        const mapaCostos = new Map(
            productos.map((producto) => [
                producto.id_producto,
                Number(producto.precioCompra),
            ])
        );

        const mapaGanancias = new Map();
        let gananciaTotal = 0;

        for (const linea of detalles) {
            const costoUnitario =
                Number(linea.costoUnitario) > 0
                    ? Number(linea.costoUnitario)
                    : (mapaCostos.get(linea.idProducto) || 0);

            const gananciaLinea =
                (Number(linea.precioUnitario) - costoUnitario) * linea.cantidad;

            mapaGanancias.set(
                linea.idVenta,
                (mapaGanancias.get(linea.idVenta) || 0) + gananciaLinea
            );
            gananciaTotal += gananciaLinea;
        }

        const ventasCompletadas = ventas.filter(
            (venta) => venta.estado === "Completada"
        );
        const ventasAnuladas = ventas.filter(
            (venta) => venta.estado === "Anulada"
        ).length;

        let totalVendido = 0;
        for (const venta of ventasCompletadas) {
            totalVendido += Number(venta.total);
        }

        const workbook = new ExcelJS.Workbook();
        const hoja = workbook.addWorksheet("Ventas");

        hoja.mergeCells("A1:H1");
        const titulo = hoja.getCell("A1");
        titulo.value = "By Marnin";
        titulo.font = { bold: true, size: 18 };
        titulo.alignment = { horizontal: "center", vertical: "middle" };
        hoja.getRow(1).height = 28;

        hoja.mergeCells("A2:H2");
        const subtitulo = hoja.getCell("A2");
        subtitulo.value = "By Marnin Makeup - Reporte de Ventas por Rango de Fechas";
        subtitulo.font = { bold: true, size: 12 };
        subtitulo.alignment = { horizontal: "center" };

        hoja.mergeCells("A3:H3");
        const rango = hoja.getCell("A3");
        rango.value =
            `Del ${fechaInicio} al ${fechaFin}  |  ` +
            `Generado: ${new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" })}`;
        rango.alignment = { horizontal: "center" };

        hoja.columns = [
            { key: "id", width: 10 },
            { key: "fecha", width: 14 },
            { key: "cliente", width: 28 },
            { key: "vendedor", width: 28 },
            { key: "metodoPago", width: 16 },
            { key: "estado", width: 14 },
            { key: "total", width: 16 },
            { key: "ganancia", width: 16 },
        ];

        const filaEncabezado = hoja.getRow(5);
        filaEncabezado.values = [
            "N° Venta",
            "Fecha",
            "Cliente",
            "Vendedor",
            "Método de Pago",
            "Estado",
            "Total",
            "Ganancia",
        ];
        filaEncabezado.font = { bold: true };
        filaEncabezado.eachCell((cell) => {
            cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFE2E8F0" },
            };
            cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            };
        });

    
        hoja.getColumn(7).numFmt = '"$"#,##0';
        hoja.getColumn(8).numFmt = '"$"#,##0';

        for (const venta of ventas) {
            const fila = hoja.addRow({
                id: venta.id_venta,
                fecha: new Date(venta.fecha).toLocaleDateString("es-CO", {
                    timeZone: "UTC",
                }),
                cliente: mapaClientes.get(venta.idCliente) || "N/A",
                vendedor: mapaUsuarios.get(venta.idUsuario) || "N/A",
                metodoPago: venta.metodoPago,
                estado: venta.estado,
                total: Number(venta.total),
                ganancia:
                    venta.estado === "Completada"
                        ? (mapaGanancias.get(venta.id_venta) || 0)
                        : 0,
            });

            if (venta.estado === "Anulada") {
                fila.getCell("estado").font = {
                    color: { argb: "FFC00000" },
                    bold: true,
                };
            }
        }


        const filaTotal = hoja.addRow({
            id: "",
            fecha: "",
            cliente: "",
            vendedor: "",
            metodoPago: "",
            estado: `TOTALES (${ventasCompletadas.length} ventas completadas, ${ventasAnuladas} anuladas)`,
            total: totalVendido,
            ganancia: gananciaTotal,
        });
        filaTotal.font = { bold: true };
        filaTotal.eachCell((cell) => {
            cell.border = {
                top: { style: "double" },
            };
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=ventas_${fechaInicio}_${fechaFin}.xlsx`
        );

        const buffer = await workbook.xlsx.writeBuffer();
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al generar el reporte" });
    }
}



