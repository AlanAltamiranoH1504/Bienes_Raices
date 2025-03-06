//Importamos todos los modelos con relaciones
import {Propiedad, Precio, Categoria, Usuario} from "../models/index.js";

const inicio = async (req, res) => {

    const precios = await Precio.findAll({raw: true});
    const categorias = await Categoria.findAll({raw: true});
    const propiedades = await Propiedad.findAll({
        limit: 3, where: {categoria_id: 1}, include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']},
        ]
    });

    res.render("inicio", {
        barra_inicio: true,
        pagina: "Inicio",
        precios,
        categorias,
        propiedades
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