import express from "express";
const router = express.Router();
import {
    admin,
    formCrearPropiedad
} from "../controllers/propiedadController.js";

router.get("/mis-propiedades", admin);
router.get("/propiedades/crear", formCrearPropiedad)

export default router;