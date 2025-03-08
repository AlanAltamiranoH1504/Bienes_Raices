import {Mensaje} from "../models/index.js";

const envioMensaje = async (req, res) =>{
    const requestBody = req.body;
    const {usuario_envia, mensaje, propiedad_id} = requestBody;

    try{
        const mensajeCreado = await Mensaje.create({mensaje, usuario_id: usuario_envia, propiedad_id});
        if (mensajeCreado){
            res.redirect(`/propiedad/${propiedad_id}`);
        }else{
            console.log("NO SE CREO EL MENSAJE EN LA DB");
        }
    }catch (e){
        console.log("ERROR: " + e)
    }
}

export {
    envioMensaje
}