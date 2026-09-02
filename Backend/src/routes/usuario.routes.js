
import { Router } from "express";
import { verificarToken } from "../middleware/Auth.middleware.js";
import { verificarRol } from "../middleware/Auth.middleware.js";

import {
    listarUsuarios,
    registrarUsuario,
    editarUsuario,
    eliminarUsuario,
    autenticarUsuario,
    obtenerUsuario  
}

    from "../controllers/usuario.controller.js";

const router = Router();

router.get("/", listarUsuarios);
router.get("/:id", obtenerUsuario);

router.post("/", verificarToken, verificarRol(1), registrarUsuario);
router.put("/:id", verificarToken, verificarRol(1), editarUsuario);
router.delete("/:id", verificarToken, verificarRol(1), eliminarUsuario);
router.post("/login", autenticarUsuario);

export default router;