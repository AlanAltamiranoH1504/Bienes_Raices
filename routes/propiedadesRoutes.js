import express from "express";
const router = express.Router();
import protegerRuta from "../middlewares/ProtegerRuta.js";
import identificarUsuario from "../middlewares/identificarUsuario.js";
import upload from "../middlewares/subirArchivo.js";
import {
    admin,
    formCrearPropiedad,
    guardarPropiedad,
    agregarImagen,
    agregarImagenDB,
    editarPropiedadFormulario,
    actualizarPropiedad,
    eliminarPropiedad,
    mostrarPropiedad,
    verMensajes,
    volver,
    cambiarEstado
} from "../controllers/propiedadController.js";
import {cerrarSesion} from "../controllers/usuarioController.js";

//Rutas protegidad para usuario en sesion
router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, formCrearPropiedad);
router.post("/guardarPropiedad", protegerRuta, guardarPropiedad);
router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post("/propiedades/guardar_imagen/:id", protegerRuta, upload.single('imagen'), agregarImagenDB);
router.get("/editar-propiedad/:id", protegerRuta, editarPropiedadFormulario);
router.post("/actualizar-propiedad", protegerRuta, actualizarPropiedad);
router.get("/eliminar-propiedad/:id", protegerRuta, eliminarPropiedad);
router.get("/mensajes/:id", protegerRuta, verMensajes);
router.get("/estado/:estado/:id", protegerRuta, cambiarEstado);
router.get("/volver", protegerRuta, volver)
router.get("/cerrar-sesion", cerrarSesion)

//Rutas de area publica
router.get('/propiedad/:id', mostrarPropiedad);

export default router;