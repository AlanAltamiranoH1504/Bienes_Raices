import {Categoria, Mensaje, Precio} from "../models/index.js";
import Propiedad from "../models/Propiedad.js";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import esVendedor from "../helpers/EsVendedor.js";
import {emailNuevoIntersado} from "../helpers/Emails.js";

const envioMensaje = async (req, res) => {
    const requestBody = req.body;
    const {usuario_envia, mensaje, propiedad_id} = requestBody;
    const cookie = req.cookies.token;
    let iniciarSesion;
    let usuario;
    let mostrarForm;

    const propiedad = await Propiedad.findOne({
        where: {id: propiedad_id}, include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']}
        ]
    });
    if(!cookie){
        console.log("No existe la cookie con el token. Debe iniciar sesion");
        iniciarSesion = true;
    }else{
        console.log("Existe la cookie en el token")
        const token = jwt.verify(cookie, process.env.JWT_SECRET);
        if (!token.id){
            iniciarSesion = true;
        }else {
            const id = token.id;
            usuario = await Usuario.findByPk(id);
            iniciarSesion = false;
            //Verificamos si el usuario es dueño de la propiedad
            mostrarForm = esVendedor(usuario, propiedad);
        }
    }

    if (mensaje.trim() === "" || mensaje === null || mensaje.length <= 10) {
        res.render("../views/propiedades/mostrar", {
            propiedad,
            barra: true,
            pagina: propiedad.titulo,
            iniciarSesion,
            mostrarForm,
            usuario,
            csrf: req.csrfToken(),
            msg_error: true
        });
        return;
    }
    try {
        const mensajeCreado = await Mensaje.create({mensaje, usuario_id: usuario_envia, propiedad_id});
        if (mensajeCreado) {
            const cookie = req.cookies.token;
            const token = jwt.verify(cookie, process.env.JWT_SECRET);
            const id = token.id;

            const usuario = await Usuario.findByPk(id);
            const datos = {
                email: usuario.email,
                nombre: usuario.nombre,
            }
            emailNuevoIntersado(datos)
            res.render("../views/propiedades/mostrar", {
                propiedad,
                barra: true,
                pagina: propiedad.titulo,
                iniciarSesion,
                mostrarForm,
                usuario,
                csrf: req.csrfToken(),
                msg: true
            });
            // res.redirect(`/propiedad/${propiedad_id}`);
        } else {
            console.log("NO SE CREO EL MENSAJE EN LA DB");
        }
    } catch (e) {
        console.log("ERROR: " + e)
    }
}

export {
    envioMensaje
}