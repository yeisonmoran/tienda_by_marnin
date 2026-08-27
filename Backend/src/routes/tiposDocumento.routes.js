
import { Router} from "express";

import {
    listarTiposDocumento,
} 

from "../controllers/tipoDocumento.controller.js"

const router = Router();

router.get("/", listarTiposDocumento);


export default router;