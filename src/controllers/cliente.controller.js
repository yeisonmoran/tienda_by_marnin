import prisma from "../config/db.js";



export async function listarClientes(req, res) {

    try {
        const clientes = await prisma.cliente.findMany();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al listar clintes" });

    }
}


export async function registrarCliente(req, res) {

    try {

        const { nombre, correo, telefono, ciudad, idTipoDocumento, numDocumento } = req.body;

        if (nombre === undefined || nombre === null || nombre === "") {

            return res.status(400).json({
                error: "El nombre es obligatorio"
            });
        }
        if (!correo) {

            return res.status(400).json({
                error: "El correo es obligatorio"
            });
        }

        if (correo.length > 60) {
            return res.status(400).json({
                error: "Demasiados caracteres minimo 60"
            });
        }
        if (!idTipoDocumento) {

            return res.status(400).json({
                error: "El tipo de documento es obligatorio"
            });
        }
        if (!numDocumento || numDocumento.trim() === "") {

            return res.status(400).json({
                error: "El documento es obligatorio"
            });
        }
        if (numDocumento.length > 10) {

            return res.status(400).json({
                error: "Solo 10 digitos"
            });
        }


        const nuevoCliente = await prisma.cliente.create({
            data: { nombre, correo, telefono, ciudad, idTipoDocumento, numDocumento }
        });

        res.status(201).json(nuevoCliente);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar cliente" });

    }

}



export async function editarCliente(req, res) {

    try {
        const { id } = req.params;
        const { nombre, correo, telefono, ciudad, } = req.body;

        const clienteActualizado = await prisma.cliente.update({
            where: { id_cliente: Number(id) },
            data: { nombre, correo, telefono, ciudad }
        });

        res.json(clienteActualizado);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al editar cliente" });
    }

}

export async function eliminarCliente(req, res) {
    try {
        const { id } = req.params;

        await prisma.cliente.delete({

            where: { id_cliente: Number(id) },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar cliente" });
    }
}

export async function obtenerCliente(req, res) {
    try {

        const { id } = req.params;

        const clientes = await prisma.cliente.findUnique({
            where: { id_cliente: Number(id) },
        });

        if (!clientes) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }

        res.json(clientes);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtenr cliente" });


    }

}




