
import { Router } from "express";

import {
  
  listarCategorias,
  obtenerCategoria,
  registrarCategoria,
  editarCategoria,
  eliminarCategoria,
} 

from "../controllers/categoria.controller.js";

const router = Router();

router.get("/", listarCategorias);
router.get("/:id", obtenerCategoria);
router.post("/", registrarCategoria);
router.put("/:id", editarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;
