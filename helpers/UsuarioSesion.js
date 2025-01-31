import usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const usuarioSesion = async (token) =>{
    const decodificacion = jwt.verify(token, process.env.JWT_SECRET);
    const {id} = decodificacion;

    const usuarioEncontrado = await usuario.findOne({id: id});
    const {nombre} = usuarioEncontrado;
    return nombre;
}
export default usuarioSesion;