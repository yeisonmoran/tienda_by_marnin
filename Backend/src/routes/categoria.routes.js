
import { Router } from "express";
import { verificarToken } from "../middleware/Auth.middleware.js";
import { verificarRol } from "../middleware/Auth.middleware.js";

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


router.post("/", verificarToken, verificarRol(1), registrarCategoria);
router.put("/:id", verificarToken, verificarRol(1), editarCategoria);
router.delete("/:id", verificarToken, verificarRol(1), eliminarCategoria);

export default router;
