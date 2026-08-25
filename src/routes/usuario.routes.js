
import { Router } from "express";

import {
    listarUsuarios,
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
    autenticarUsuario,
}

    from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", registrarUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);
router.post("/login", autenticarUsuario);

export default router;