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
        const {id} = propiedadGuardada;
        res.redirect(`/propiedades/agregar-imagen/${id}`);
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

const agregarImagen = async (req, res) =>{
    const id = req.params.id;

    //Validamos que la propiedad existe
    const propiedadExistente = await Propiedad.findOne({where: {id}});
    if (!propiedadExistente){
        console.log("La propiedad no existe")
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }

    //Validamos que la propiedad no esta publicada
    const {publicado} = propiedadExistente;
    if (publicado === true){
        console.log("La propiedad ya esta publicada")
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }

    //Verificamos que el usuario en sesion sea el dueño de la propiedad
    const {usuario_id} = propiedadExistente;
    const token_sesion = req.cookies.token;
    const token_decodificado = jwt.decode(token_sesion);
    const id_sesion = token_decodificado.id;

    if (usuario_id !== id_sesion){
        console.log("El usuario en sesion no es dueño de la propiedad")
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }
    console.log("La propiedad existe, no esta publicada y el usuario en sesion es su dueño")
    res.render('propiedades/agregar-imagen', {
        id_propiedad: id,
        pagina: `Agregar imagen de: ${propiedadExistente.titulo}`,
        barra: true,
        csrf: req.csrfToken()
    });
}

const agregarImagenDB = (req, res) =>{
    const id_propiedad = req.body.id_propiedad;
    res.send("Guardando la imagen de la propiedad: " + id_propiedad)
}

export {
    admin,
    formCrearPropiedad,
    guardarPropiedad,
    agregarImagen,
    agregarImagenDB
}