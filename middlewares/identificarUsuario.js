import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const indentificarUsuario = async (req, res, next) =>{
    const token = req.cookies.token;
    if(!token){
        console.log("Usuario no esta autenticado");
    }

    try{
        //Tratamos el token
        const decodificacion = jwt.verify(token, process.env.JWT_SECRET);
        const {id} = decodificacion;
        console.log("Id " + id)
        if(!id){
            req.usuario = null;
            return next();
        }
        const usuario = await Usuario.findOne({where: id});
        console.log(usuario);
    }catch (e){
        console.log("ERROR: " + e)
    }
}

export default indentificarUsuario;