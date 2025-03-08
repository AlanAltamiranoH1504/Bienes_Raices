//Importamos todos los modelos con relaciones
import {Propiedad, Precio, Categoria, Usuario} from "../models/index.js";
import {where} from "sequelize";

const inicio = async (req, res) => {
    const precios = await Precio.findAll({raw: true});
    const categorias = await Categoria.findAll({raw: true});
    const propiedades = await Propiedad.findAll({
        limit: 3, where: {categoria_id: 1}, include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']},
        ]
    });

    const departamentos = await Propiedad.findAll({
        limit: 4,
        where: {categoria_id: 2}, include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']},
        ]
    });
    console.log(departamentos)
    res.render("inicio", {
        barra_inicio: true,
        pagina: "Inicio",
        precios,
        categorias,
        propiedades,
        departamentos
    });
}

const pagina404 = (req, res) => {
    res.send("Pagina 404");
}

const categorias = async (req, res) => {
    const id = req.params.id;

    const categoriaDB = await Categoria.findByPk(id);
    if (!categoriaDB){
        res.redirect("/app/error-no-encontrado");
        return;
    }

    const propiedades = await Propiedad.findAll({
        where: {categoria_id: id},
        include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']}
        ]
    });
    const categoria = await Categoria.findByPk(id);
    res.render('categorias', {
        propiedades,
        barra_inicio: true,
        categoria,
        pagina: categoria.nombre
    });
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