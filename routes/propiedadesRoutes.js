import express from "express";
const router = express.Router();
import {admin
} from "../controllers/propiedadController.js";

router.get("/mis-propiedades", admin);

export default router;