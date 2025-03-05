//Importamos todos los modelos con relaciones
import {Propiedad, Precio, Categoria, Usuario} from "../models/index.js";

const inicio = async (req, res) => {

    //Tramos los precios y las categorias
    const precios = await Precio.findAll({raw: true});
    const categorias = await Categoria.findAll({raw: true});

    res.render("inicio", {
        barra_inicio:true,
        pagina: "Inicio",
        precios,
        categorias
    });
}

const pagina404 = (req, res) => {
    res.send("Pagina 404");
}

const categorias = (req, res) => {
    res.send("Pagina de categorias");

}

const buscador = (req, res) => {
    res.send("Pagina de buscador");
}

export {
    inicio,
    pagina404,
    categorias,
    buscador
}