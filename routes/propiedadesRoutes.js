import express from "express";
const router = express.Router();
import protegerRuta from "../middlewares/ProtegerRuta.js";
import {
    admin,
    formCrearPropiedad,
    guardarPropiedad
} from "../controllers/propiedadController.js";

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, formCrearPropiedad);
router.post("/guardarPropiedad", protegerRuta, guardarPropiedad);

export default router;