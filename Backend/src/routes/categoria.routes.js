
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


router.get("/", listarCategorias);
router.get("/:id", obtenerCategoria);


router.post("/", verificarToken, registrarCategoria);
router.put("/:id", verificarToken, editarCategoria);
router.delete("/:id", verificarToken, eliminarCategoria);

export default router;
