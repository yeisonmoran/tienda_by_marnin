import { Router } from "express";
import {verificarToken} from "../middleware/Auth.middleware.js";

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
router.post("/", verificarToken, registrarCliente);
router.put("/:id", verificarToken, editarCliente);
router.delete("/:id", verificarToken, eliminarCliente);

export default router;