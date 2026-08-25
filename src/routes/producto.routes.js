
import { Router} from "express";
import {verificarToken} from "../middleware/Auth.middleware.js";

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


router.post("/", verificarToken, registrarProducto);
router.put("/:id", verificarToken, editarProducto);
router.put("/:id", verificarToken, actualizarStock);
router.delete("/:id", verificarToken, eliminarProducto);

export default router;