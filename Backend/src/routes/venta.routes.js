import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/auth.middleware.js";

import {
    listarVentas,
    registrarVenta,
    anularVenta,
    obtenerGananciaVenta,
    obtenerVenta,
}

    from "../controllers/venta.controller.js";

const router = Router();

router.get("/", listarVentas);

router.post("/", verificarToken, verificarRol(1,2), registrarVenta);
router.patch("/:id", verificarToken, verificarRol(1), anularVenta);
router.get("/:id/ganancia", verificarToken, verificarRol(1), obtenerGananciaVenta);
router.get("/:id", verificarToken, verificarRol(1, 2), obtenerVenta);

export default router;