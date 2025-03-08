//Importamos todos los modelos con relaciones
import {Propiedad, Precio, Categoria, Usuario} from "../models/index.js";
import csurf from "csurf";
import {Op} from "sequelize";

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
    res.render("inicio", {
        barra_inicio: true,
        pagina: "Inicio",
        precios,
        categorias,
        propiedades,
        departamentos,
        csrf: req.csrfToken()
    });
}

const pagina404 = (req, res) => {
    res.render("pagina404", {
        barra_inicio: true,
        pagina: "404",
        csrf: req.csrfToken()
    });
}

const categorias = async (req, res) => {
    const id = req.params.id;

    const categoriaDB = await Categoria.findByPk(id);
    if (!categoriaDB) {
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
        pagina: categoria.nombre,
        csrf: req.csrfToken()
    });
}

const buscador = async (req, res) => {
    const requestBody = req.body.busqueda;
    const textoBusqueda = requestBody

    //Validacion de texto a buscar no vacio
    if (textoBusqueda === null || textoBusqueda.trim() === ""){
        console.log("El campo no fue llenado de manera correcta");
        return res.redirect("back");
    }

    const propiedades = await Propiedad.findAll({
        where: {
            titulo: {
                [Op.like] : `%${textoBusqueda}%`
            }
        },
        include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']}
        ]
    });

    //Validamos cantidad de propidades para mensaje de advertencia
    if (propiedades.length < 1){
        res.render("busqueda", {
            barra_inicio: true,
            propiedades: propiedades,
            csrf: req.csrfToken(),
            msg: true,
            pagina: "Resultados"
        });
        return ;
    }
    res.render("busqueda", {
        barra_inicio: true,
        propiedades: propiedades,
        pagina: "Resultados",
        csrf: req.csrfToken()
    })
}

export {
    inicio,
    pagina404,
    categorias,
    buscador
}