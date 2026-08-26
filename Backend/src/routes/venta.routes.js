import { Router } from "express";
import { verificarToken } from "../middleware/Auth.middleware.js";

import {
    registrarVenta,
    anularVenta,
}

    from "../controllers/venta.controller.js";

const router = Router();


router.post("/", verificarToken, registrarVenta);
router.patch("/:id", verificarToken, anularVenta);

export default router;