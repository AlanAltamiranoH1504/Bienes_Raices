import categoriaModelo from "../models/Categoria.js";
import precioModelo from "../models/Precio.js";
import usuarioSesion from "../helpers/UsuarioSesion.js";
import jwt from "jsonwebtoken";
import {Propiedad} from "../models/index.js";

const admin = async (req, res) => {

    res.render("propiedades/admin", {
        pagina: "Mis propiedades",
        barra: true
    });
}

const formCrearPropiedad = async (req, res) => {
    const categorias = await categoriaModelo.findAll();
    const precios = await precioModelo.findAll();
    res.render("propiedades/formCrearPropiedad", {
        pagina: "Crear Nueva Propiedad",
        barra: true,
        csrf: req.csrfToken(),
        formulario: '',
        categorias,
        precios
    })
}

const guardarPropiedad = async (req, res) => {
    const categorias = await categoriaModelo.findAll();
    const precios = await precioModelo.findAll();
    const {titulo, descripcion, categoria, precio, habitaciones, estacionamiento, wc, calle, lat, lng} = req.body;

    //Sacamos el id del usuario que se encuentra en sesion actual
    const token = req.cookies.token;
    const decodificacion = jwt.verify(token, process.env.JWT_SECRET);
    const {id} = decodificacion;
    console.log(id)

    const formulario = {
        titulo,
        descripcion,
        categoria,
        precio,
        habitaciones,
        estacionamiento,
        wc,
        calle,
        lat,
        lng
    };

    if (titulo.trim() === "" || titulo === null) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "El titulo se encuetra vacio",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }
    if (descripcion.trim() === "" || descripcion === null || descripcion.length > 500) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "La descripcion se encuentra vacia o es muy larga",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }

    if (categoria.trim() === "" || categoria === null || descripcion.length > 500) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "No se ha seleccionado una categoria",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }

    if (precio.trim() === "" || precio === null || descripcion.length > 500) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "No se ha seleccionado un precio",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }

    if (habitaciones.trim() == "" || habitaciones === null) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "No se han definido las habitaciones",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }

    if (estacionamiento.trim() == "" || estacionamiento === null) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "No se han definido los estacionamientos",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }
    if (wc.trim() == "" || wc === null) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "No se han definido el numero de wc's",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }
    if (calle.trim() == "" || calle === null) {
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "No se ha definido la ubicacion",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
        return;
    }
    const propiedadGuardada = await Propiedad.create({
        titulo,
        descripcion,
        habitaciones,
        estacionamiento,
        wc,
        calle,
        lat,
        lng,
        imagen: "Imagen equis",
        categoria_id: categoria,
        precio_id: precio,
        usuario_id: id
    });
    if (propiedadGuardada !== null){
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: false,
            msg: "Propiedad creada de manera correcta!",
            csrf: req.csrfToken(),
            formulario
        });
    }else{
        res.render("propiedades/formCrearPropiedad", {
            pagina: "Crear Nueva Propiedad",
            barra: true,
            error: true,
            msg: "Error al crear la propiedad",
            csrf: req.csrfToken(),
            formulario,
            categorias,
            precios
        });
    }
}

export {
    admin,
    formCrearPropiedad,
    guardarPropiedad
}