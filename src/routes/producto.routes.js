
import { Router} from "express";

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
router.post("/", registrarProducto);
router.put("/:id", editarProducto);
router.put("/:id", actualizarStock);
router.delete("/:id", eliminarProducto);

export default router;