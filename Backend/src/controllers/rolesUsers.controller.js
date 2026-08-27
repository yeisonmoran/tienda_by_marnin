import prisma from "../config/db.js";

export async function listarRoles(req, res) {
  try {
    const rols = await prisma.rol.findMany();
    res.json(rols);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar roles"});
  }
}
