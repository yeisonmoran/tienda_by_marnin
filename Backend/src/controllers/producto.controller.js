import prisma from "../config/db.js";



export async function listarProductos(req, res) {
    try {
        const productos = await prisma.producto.findMany({
            where: { activo: true },
        });
        res.json(productos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al listar productos" });
    }
}


export async function obtenerProducto(req, res) {
    try {
        const { id } = req.params;

        const producto = await prisma.producto.findUnique({
            where: { id_producto: Number(id) },
        });

        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener producto" });
    }
}


export async function registrarProducto(req, res) {
    try {
        const { codigo, nombre, marca, linea, idCategoria, precio, precioCompra, stock, stockMinimo, descripcion } = req.body;

        if (codigo === undefined || codigo === null || codigo === "") {

            return res.status(400).json({
                error: "El código es obligatorio"
            });
        }
        if (nombre === undefined || nombre === null || nombre === "") {

            return res.status(400).json({
                error: "El nombre es obligatorio"
            });
        }
    
        if (idCategoria === undefined || idCategoria === null || idCategoria === "") {

            return res.status(400).json({
                error: "La categoría es obligatoria"
            });
        }
        if (precio === undefined || precio === null || precio === "") {

            return res.status(400).json({
                error: "El precio es obligatorio"
            });
        }

         if (precioCompra === undefined || precioCompra === null || precioCompra === "") {

            return res.status(400).json({
                error: "El precio de compra es obligatorio"
            });
        }

        if (Number(precioCompra) <= 0) {
            return res.status(400).json({
                error: "El precio de compra debe ser mayor a 0"
            });
        }

        if (precioCompra > precio) {
            return res.status(400).json({
                error: "El precio de compra no puuede ser mayor al precio de venta"

            });
        }

        if (stock === undefined || stock === null || stock === "") {

            return res.status(400).json({
                error: "El stock es obligatorio"
            });
        }
        if (stockMinimo === undefined || stockMinimo === null || stockMinimo === "") {

            return res.status(400).json({
                error: "El stock mínimo es obligatorio"
            });
        }

        const existente = await prisma.producto.findFirst({ where: { codigo } });

        if (existente) {
            return res.status(409).json({
                error: "Ya existe un producto con ese código"
            });
        }

        const nuevoProducto = await prisma.producto.create({

            data: { codigo, nombre, marca, linea, idCategoria, precio, precioCompra, stock, stockMinimo, descripcion },
        });

        res.status(201).json(nuevoProducto);

    } catch (error) {
        console.error(error);
        if (error.code === "P2002") {
            return res.status(409).json({ error: "Ya existe un producto con ese código" });
        }
        res.status(500).json({ error: "Error al registrar producto" });
    }
}


export async function editarProducto(req, res) {

    try {
        const { id } = req.params;
        const { codigo, nombre, marca, linea, precio, precioCompra, stock, stockMinimo, descripcion } = req.body;

        if (stock === undefined) {
            return res.status(400).json({ error: "El stock es obligatorio" });
        }

        if (precioCompra === undefined || precioCompra === null || precioCompra === "" || Number(precioCompra) <= 0) {
            return res.status(400).json({
                error: "El precio de compra es obligatorio y debe ser mayor a 0"
            });
        }

        if (precioCompra > precio) {
            return res.status(400).json({
                error: "El precio de compra no puede ser mayor al precio de venta"

            });
        }

        const existente = await prisma.producto.findFirst({
            where: { codigo, id_producto: { not: Number(id) } },
        });

        if (existente) {
            return res.status(409).json({
                error: "Ya existe otro producto con ese código"
            });
        }

        const productoActualizado = await prisma.producto.update({
            where: { id_producto: Number(id) },
            data: { codigo, nombre, marca, linea, precio, precioCompra, stock, stockMinimo, descripcion },
        });

        res.json(productoActualizado);

    } catch (error) {
        console.error(error);
        if (error.code === "P2002") {
            return res.status(409).json({ error: "Ya existe otro producto con ese código" });
        }
        res.status(500).json({ error: "Error al editar producto" });
    }

}


export async function actualizarStock(req, res) {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;

        const producto = await prisma.producto.update({
            where: { id_producto: Number(id) },
            data: {
                stock: {
                    increment: cantidad,
                },
            },
        });

        res.json(producto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar stock" });
    }

}


export async function eliminarProducto(req, res) {
    try {
        const { id } = req.params;

        await prisma.producto.update({
            where: { id_producto: Number(id) },
            data: { activo: false },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar producto" });
    }
}

