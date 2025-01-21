import express  from "express";
import {
    formularioLogion, formularioRegistro, olvidePassword
} from "../controllers/usuarioController.js";
const router = express.Router();

//Rutas para el usuario
router.get("/login", formularioLogion);
router.get("/registro", formularioRegistro);
router.get("/olvide-password", olvidePassword);

export default router;