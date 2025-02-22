import express from "express";
const router = express.Router();
import protegerRuta from "../middlewares/ProtegerRuta.js";
import upload from "../middlewares/subirArchivo.js";
import {
    admin,
    formCrearPropiedad,
    guardarPropiedad,
    agregarImagen,
    agregarImagenDB,
    editarPropiedadFormulario,
    actualizarPropiedad,
    eliminarPropiedad
} from "../controllers/propiedadController.js";
import {rule} from "postcss";

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, formCrearPropiedad);
router.post("/guardarPropiedad", protegerRuta, guardarPropiedad);
router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post("/propiedades/guardar_imagen/:id", protegerRuta, upload.single('imagen'), agregarImagenDB);
router.get("/editar-propiedad/:id", protegerRuta, editarPropiedadFormulario);
router.post("/actualizar-propiedad", protegerRuta, actualizarPropiedad);
router.get("/eliminar-propiedad/:id", protegerRuta, eliminarPropiedad);

export default router;