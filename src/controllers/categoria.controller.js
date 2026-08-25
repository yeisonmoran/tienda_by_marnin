import prisma from "../config/db.js";


export async function listarCategorias(req, res) {
  try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al listar categorías" });
  }
}


export async function obtenerCategoria(req, res) {
  try {
    const { id } = req.params;

    const categoria = await prisma.categoria.findUnique({
      where: { id_categoria: Number(id) },
    });

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la categoría" });
  }
}



export async function registrarCategoria(req, res) {
  try {
    const { nombre, descripcion } = req.body;

    if (!nombre || nombre === "") {
      return res.status(400).json({ error: "El nombre es obligatorio" });
    }

    const nuevaCategoria = await prisma.categoria.create({
      data: { nombre, descripcion },
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la categoría" });
  }
}



export async function editarCategoria(req, res) {
  try {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;

    const categoriaActualizada = await prisma.categoria.update({
      where: { id_categoria: Number(id) },
      data: { nombre, descripcion },
    });

    res.json(categoriaActualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar la categoría" });
  }
}



export async function eliminarCategoria(req, res) {
  try {
    const { id } = req.params;

    await prisma.categoria.delete({
      where: { id_categoria: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
}
