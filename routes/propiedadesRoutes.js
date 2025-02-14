import express from "express";
const router = express.Router();
import protegerRuta from "../middlewares/ProtegerRuta.js";
import {
    admin,
    formCrearPropiedad,
    guardarPropiedad,
    agregarImagen,
    agregarImagenDB
} from "../controllers/propiedadController.js";

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, formCrearPropiedad);
router.post("/guardarPropiedad", protegerRuta, guardarPropiedad);
router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post("/propiedades/agregar-imagen", protegerRuta, agregarImagenDB);

export default router;