import { Router } from "express";

import {
    registrarVenta,
    anularVenta,
}

    from "../controllers/venta.controller.js";

const router = Router();


router.post("/", registrarVenta);
router.patch("/:id", anularVenta);

export default router;