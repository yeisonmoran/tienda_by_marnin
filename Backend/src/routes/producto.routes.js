import { Router} from "express";
import {verificarToken} from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/auth.middleware.js";

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


router.post("/registrar_cliente", verificarToken, verificarRol(1), registrarProducto);
router.put("/:id", verificarToken, verificarRol(1),editarProducto);
router.patch("/:id/update_stock", verificarToken, verificarRol(1), actualizarStock);
router.delete("/:id", verificarToken, verificarRol(1), eliminarProducto);

export default router;