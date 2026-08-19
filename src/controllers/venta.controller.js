import prisma from "../config/db.js";


export async function listarVentas(req, res){

    try {
        const ventas = await prisma.venta.findMany();
        res.json(ventas);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error al listar ventas"});
    }

}



export async function registrarVenta(req, res){

    try {

        const {idCliente, idUsuario, metodoPago, productos } = req.body;

        if (!idCliente){
            return res.status(400).json({
                error: "El cliente es obligatorio"
            });
        }

        if (!idUsuario){
            return res.status(400).json({
                error: "El usuario es obligatorio"
            });
        }

        if (!metodoPago){
            return res.status(400).json({
                error: "El metodo de pago es obligatorio"
            });
        }

        if (!idUsuario){
            return res.status(400).json({
                error: "El usuario es obligatorio"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar venta"});
    }
}