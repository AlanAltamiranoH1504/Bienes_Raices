import categoriaModelo from "../models/Categoria.js";
import precioModelo from "../models/Precio.js";
import usuarioSesion from "../helpers/UsuarioSesion.js";
import jwt from "jsonwebtoken";
import {Categoria, Precio, Propiedad} from "../models/index.js";

const admin = async (req, res) => {
    //Sacamos las propiedades del usuario en sesion
    const cookie_token = req.cookies.token;
    const token_decodificado = jwt.decode(cookie_token);
    const {id} = token_decodificado;

    //Sacamos las propiedades con consulta multitabla
    const propiedadesUsuario = await Propiedad.findAll({where: {usuario_id: id}, include: [
            {model: Categoria, attributes: ['id',  'nombre']},
            {model: Precio, attributes: ['id',  'nombre']},
        ]});
    res.render("propiedades/admin", {
        pagina: "Mis propiedades",
        barra: true,
        propiedades: propiedadesUsuario
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
    const propiedadExistente = await Propiedad.findByPk(id);

    if (!propiedadExistente){
        console.log("La propiedad no existe. Entra aqui")
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }

    //Validamos que la propiedad no esta publicada
    const publicado = propiedadExistente.publicado;
    if (publicado === true){
        console.log("La propiedad ya esta publicada")
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }

    //Verificamos que el usuario en sesion sea el dueño de la propiedad
    const usuario_id = propiedadExistente.usuario_id;
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
    res.render('propiedades/agregar-imagen', {
        id_propiedad: id,
        pagina: `Agregar imagen de: ${propiedadExistente.titulo}`,
        barra: true,
        csrf: req.csrfToken()
    });
}

const agregarImagenDB = async (req, res) =>{
    const id_propiedad = req.body.id_propiedad;


    //Verificamos que la propiedad exista
    const propiedadExistente = await Propiedad.findOne({where: {id: id_propiedad}});
    if (!propiedadExistente){
        console.log("La propiedad no existe en la db");
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }

    //Verificamos que el estado de la propiedad no sea publicado
    const publicado = propiedadExistente.publicado;
    if (publicado !== false){
        console.log("La propiedad ya esta publicada");
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }
    //Verificamos que el usuario en sesion sea el dueño de la propiedad
    const id_sesion = req.cookies.token;
    const token_decodificado = jwt.decode(id_sesion);
    if (propiedadExistente.usuario_id !== token_decodificado.id){
        console.log("El usuario en sesion no es dueño de la propiedad");
        res.render("propiedades/admin", {
            pagina: "Mis propiedades",
            barra: true
        });
        return;
    }
    try{
        //Guardamos la img de la propiedad y cambiamos el estado de publicado
        propiedadExistente.imagen = req.file.filename;
        propiedadExistente.publicado = true;
        await propiedadExistente.save();
        // setTimeout(() =>{
        //     res.redirect("/mis-propiedades");
        // }, 3000);
    }catch (e){
        console.log("Error: " + e)
    }
}

const editarPropiedadFormulario = async (req, res) =>{
    const idParametro = req.params.id;
    const propiedadEncontrada = await Propiedad.findOne({where: {id: idParametro}, include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']}
        ]});
    const categorias = await Categoria.findAll();
    const precios = await Precio.findAll();
    const tokenInSession = req.cookies.token;
    const tokenDecode = jwt.decode(tokenInSession);
    const id_usuario_session = tokenDecode.id;

    //Verificamos que la propiedad exista
    if(!propiedadEncontrada){
        console.log("La propiedad con ese ID no existe en la base de datos");
        const propiedadesUsuario = await Propiedad.findAll({where: {usuario_id: id_usuario_session}, include: [
                {model: Categoria, attributes: ['id', 'nombre']},
                {model: Precio, attributes: ['id', 'nombre']}
            ]});
        res.render("propiedades/admin", {
           pagina: 'Mis propiedades',
           barra: true,
            propiedades: propiedadesUsuario
        });
        return;
    }

    //Verificamos el usuario en sesion sea el dueño de esa propiedad
    if(propiedadEncontrada.usuario_id !== id_usuario_session){
        console.log("El usuario en sesion no es dueño de esa propiedad");
        const propiedadesUsuario = await Propiedad.findAll({where: {usuario_id: id_usuario_session}, include: [
                {model: Categoria, attributes: ['id', 'nombre']},
                {model: Precio, attributes: ['id', 'nombre']}
            ]});
        res.render("propiedades/admin", {
            pagina: 'Mis propiedades',
            barra: true,
            propiedades: propiedadesUsuario
        });
        return;
    }
    //Paso la validacion y se muestra formulario de edicion con los datos de la propiedad a editar
    res.render('propiedades/form-editarPropiedad', {
        pagina: 'Edicion de Propiedad',
        barra: true,
        csrf: req.csrfToken(),
        propiedad: propiedadEncontrada,
        categorias: categorias,
        precios: precios
    });
}

const actualizarPropiedad = async (req, res) =>{
    const {propiedad_id,
        titulo,
        descripcion,
        categoria,
        precio,
        habitaciones,
        estacionamiento,
        wc
    } = req.body;

    //Buscamos la propiedad en la base de datos y actualizamos los datos
    const propiedadPorActualizar = await Propiedad.findOne({where: {id: propiedad_id}});
    propiedadPorActualizar.titulo = titulo;
    propiedadPorActualizar.descripcion = descripcion;
    propiedadPorActualizar.categoria_id = categoria;
    propiedadPorActualizar.precio_id = precio;
    propiedadPorActualizar.habitaciones = habitaciones;
    propiedadPorActualizar.estacionamiento = estacionamiento;
    propiedadPorActualizar.wc = wc;
    await propiedadPorActualizar.save();

    const tokenInSession = req.cookies.token;
    const tokenDecode = jwt.decode(tokenInSession);
    const id_usuario_session = tokenDecode.id;
    const propiedadesUsuario = await Propiedad.findAll({where: {usuario_id: id_usuario_session}, include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']}
        ]});
    res.render("propiedades/admin", {
        pagina: 'Mis propiedades',
        barra: true,
        propiedades: propiedadesUsuario
    });
}

const eliminarPropiedad = (req, res) =>{
    res.send("Eliminando propiedad con id: " + req.params.id);
}

export {
    admin,
    formCrearPropiedad,
    guardarPropiedad,
    agregarImagen,
    agregarImagenDB,
    editarPropiedadFormulario,
    eliminarPropiedad,
    actualizarPropiedad
}