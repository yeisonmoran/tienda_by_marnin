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
        const { codigo, nombre, marca, idCategoria, precio, stock, stockMinimo, descripcion } = req.body;

        if (codigo === undefined || codigo === null || codigo === "") {

            return res.status(400).json({
                error: "El codigo es obligatorio"
            });
        }
        if (nombre === undefined || nombre === null || nombre === "") {

            return res.status(400).json({
                error: "El nombre es obligatorio"
            });
        }
        if (marca === undefined || marca === null || marca === "") {

            return res.status(400).json({
                error: "La marca es obligatorio"
            });
        }
        if (idCategoria === undefined || idCategoria === null || idCategoria === "") {

            return res.status(400).json({
                error: "La categoria es obligatoria"
            });
        }
        if (precio === undefined || precio === null || precio === "") {

            return res.status(400).json({
                error: "El precio es obligatorio"
            });
        }
        if (stock === undefined || stock === null || stock === "") {

            return res.status(400).json({
                error: "El stock es obligatorio"
            });
        }
        if (stockMinimo === undefined || stockMinimo === null || stockMinimo === "") {

            return res.status(400).json({
                error: "El stock minimo es obligatorio"
            });
        }

        const nuevoProducto = await prisma.producto.create({

            data: { codigo, nombre, marca, idCategoria, precio, stock, stockMinimo, descripcion },
        });

        res.status(201).json(nuevoProducto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar producto" });
    }
}


export async function editarProducto(req, res) {

    try {
        const { id } = req.params;
        const { codigo, nombre, marca, precio, stock, stockMinimo, descripcion } = req.body;

        if (stock === undefined) {
            return res.status(400).json({ error: "El stock es obligatorio" });
        }
        const productoActualizado = await prisma.producto.update({
            where: { id_producto: Number(id) },
            data: { codigo, nombre, marca, precio, stock, stockMinimo, descripcion },
        });

        res.json(productoActualizado);

    } catch (error) {
        console.error(error);
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

