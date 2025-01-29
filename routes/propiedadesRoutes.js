import express from "express";
const router = express.Router();
import {
    admin,
    formCrearPropiedad,
    guardarPropiedad
} from "../controllers/propiedadController.js";

router.get("/mis-propiedades", admin);
router.get("/propiedades/crear", formCrearPropiedad);
router.post("/guardarPropiedad", guardarPropiedad);

export default router;