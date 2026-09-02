
import { Router} from "express";
import {verificarToken} from "../middleware/Auth.middleware.js";
import { verificarRol } from "../middleware/Auth.middleware.js";

import {
    listarProductos,
    obtenerProducto,
    registrarProducto,
    editarProducto,
    actualizarStock,
    eliminarProducto,
} 

from "../controllers/producto.controller.js";

const router = Router();

router.get("/", listarProductos);
router.get("/:id", obtenerProducto);


router.post("/", verificarToken, verificarRol(1), registrarProducto);
router.put("/:id", verificarToken, verificarRol(1),editarProducto);
router.put("/:id", verificarToken, verificarRol(1), actualizarStock);
router.delete("/:id", verificarToken, verificarRol(1), eliminarProducto);

export default router;