
import { Router } from "express";
import {verificarToken} from "../middleware/Auth.middleware.js";

import {

  listarCategorias,
  obtenerCategoria,
  registrarCategoria,
  editarCategoria,
  eliminarCategoria,
}

  from "../controllers/categoria.controller.js";

const router = Router();

// Estas son libres
router.get("/", listarCategorias);
router.get("/:id", obtenerCategoria);

// El usuario necesitaria logiarse para interactura con estas funciones
router.post("/", verificarToken, registrarCategoria);
router.put("/:id", verificarToken, editarCategoria);
router.delete("/:id", verificarToken, eliminarCategoria);

export default router;
