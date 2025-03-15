import express  from "express";
import {
    formularioLogion,
    formularioRegistro,
    olvidePassword,
    saveUsuario,
    confirmar,
    recuperarPassword,
    formularioRecuperacion,
    actualizarPassword,
    validacionLogion,
    cerrarSesion
} from "../controllers/usuarioController.js";
const router = express.Router();

//Rutas para el usuario
router.get("/login", formularioLogion);
router.post("/login", validacionLogion);
router.get("/registro", formularioRegistro);
router.post("/registro", saveUsuario);
router.get("/olvide-password", olvidePassword);
router.get("/confirmar/:token", confirmar);
router.post("/recuperarPassword", recuperarPassword);
router.get("/recuperar/:token", formularioRecuperacion);
router.post("/actualizarPassword", actualizarPassword);

export default router;