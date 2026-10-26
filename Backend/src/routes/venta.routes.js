import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/auth.middleware.js";

import {
    listarVentas,
    registrarVenta,
    exportarVentas,
    anularVenta,
    obtenerGananciaVenta,
    obtenerVenta,
}

    from "../controllers/venta.controller.js";

const router = Router();

router.get("/", listarVentas);

router.post("/registrar_venta", verificarToken, verificarRol(1,2), registrarVenta);
router.get("/reportes", verificarToken, verificarRol(1), exportarVentas);
router.patch("/:id", verificarToken, verificarRol(1), anularVenta);
router.get("/:id/ganancia", verificarToken, verificarRol(1), obtenerGananciaVenta);
router.get("/:id", verificarToken, verificarRol(1, 2), obtenerVenta);

export default router; 