import express from "express";
import {envioMensaje} from "../controllers/mensajeController.js";
const router = express.Router();

router.post("/send", envioMensaje);

export default router;