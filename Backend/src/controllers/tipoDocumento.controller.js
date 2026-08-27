import prisma from "../config/db.js";

export async function listarTiposDocumento(req, res) {
  try {
    const Tipo = await prisma.tipoDocumento.findMany();
    res.json(Tipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar tipos de documento"});
  }
}
