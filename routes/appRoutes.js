import express from "express";
import {
    inicio,
    pagina404,
    categorias,
    buscador
}
    from "../controllers/appController.js";

const router = express.Router();

//Pagina de inicio
router.get("/inicio", inicio);

//Pagina 404
router.get("/error-no-encontrado", pagina404);

//Categorias
router.get("/categorias/:id", categorias)

//Buscador
router.post("/buscador", buscador);

export default router;