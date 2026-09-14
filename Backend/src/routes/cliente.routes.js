import { Router } from "express";
import {verificarToken} from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/auth.middleware.js";

import {
  listarClientes,
  obtenerCliente,
  registrarCliente,
  editarCliente,
  eliminarCliente,
}

  from "../controllers/cliente.controller.js";

const router = Router();

router.get("/", listarClientes);
router.get("/:id", obtenerCliente);

router.post("/", verificarToken, verificarRol(1,2), registrarCliente);
router.put("/:id", verificarToken, verificarRol(1,2), editarCliente);
router.delete("/:id", verificarToken, verificarRol(1), eliminarCliente);

export default router;