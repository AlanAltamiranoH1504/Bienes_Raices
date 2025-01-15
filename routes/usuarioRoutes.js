import express  from "express";
import {
    formularioLogion, formularioRegistro
} from "../controllers/usuarioController.js";
const router = express.Router();

//Rutas para el usuario
router.get("/login", formularioLogion);
router.get("/registro", formularioRegistro);

export default router;