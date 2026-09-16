
import { Router } from "express";
import { verificarToken } from "../middleware/auth.middleware.js";
import { verificarRol } from "../middleware/auth.middleware.js";

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

router.post("/registrar_usuario", verificarToken, verificarRol(1), registrarUsuario);
router.put("/:id", verificarToken, verificarRol(1), editarUsuario);
router.delete("/:id", verificarToken, verificarRol(1), eliminarUsuario);
router.post("/login", autenticarUsuario);

export default router;