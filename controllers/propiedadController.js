import categoria from "../models/Categoria.js";
import precio from "../models/Precio.js";

const admin = (req, res) =>{
    // res.send("Desde la pagina home de propiedades")
    res.render("propiedades/admin", {
        pagina: "Mis propiedades",
        barra: true
    });
}

const formCrearPropiedad = async (req, res) =>{
    const categorias = await categoria.findAll();
    const precios = await precio.findAll();
    res.render("propiedades/formCrearPropiedad", {
        pagina: "Crear Nueva Propiedad",
        barra: true,
        csrf: req.csrfToken(),
        formulario: '',
        categorias,
        precios
    })
}

const guardarPropiedad = (req, res) =>{
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
            formulario
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
            formulario
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
            formulario
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
            formulario
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
            formulario
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