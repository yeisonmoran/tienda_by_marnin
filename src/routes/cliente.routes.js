import { Router } from "express";

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
router.post("/", registrarCliente);
router.put("/:id", editarCliente);
router.delete("/:id", eliminarCliente); 

export default router;