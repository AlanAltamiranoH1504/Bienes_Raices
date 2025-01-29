import categoriaModelo from "../models/Categoria.js";
import precioModelo from "../models/Precio.js";

const admin = (req, res) =>{
    // res.send("Desde la pagina home de propiedades")
    res.render("propiedades/admin", {
        pagina: "Mis propiedades",
        barra: true
    });
}

const formCrearPropiedad = async (req, res) =>{
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

const guardarPropiedad = async (req, res) =>{
    const categorias = await categoriaModelo.findAll();
    const precios = await precioModelo.findAll();
    const {titulo, descripcion, categoria, precio, habitaciones, estacionamiento, wc, calle, lat, lng} = req.body;
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

    if (titulo.trim() === "" || titulo === null){
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
    if (descripcion.trim() === "" || descripcion === null || descripcion.length > 500){
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

    if (categoria.trim() === "" || categoria === null || descripcion.length > 500){
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

    if (precio.trim() === "" || precio === null || descripcion.length > 500){
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

    if (habitaciones.trim() == "" || habitaciones === null){
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

    if (estacionamiento.trim() == "" || estacionamiento === null){
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
    if (wc.trim() == "" || wc === null){
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
    if (calle.trim() == "" || calle === null){
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
    console.log("Guardando la propiedad");
    console.log(formulario)
}

export {
    admin,
    formCrearPropiedad,
    guardarPropiedad
}