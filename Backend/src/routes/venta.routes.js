import { Router } from "express";
import { verificarToken } from "../middleware/Auth.middleware.js";
import { verificarRol } from "../middleware/Auth.middleware.js";

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
router.get("/:id", verificarToken, verificarRol(1), obtenerVenta);

export default router;