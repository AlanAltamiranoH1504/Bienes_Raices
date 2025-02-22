import usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const usuarioSesion = async (token) =>{
    const token_decode = jwt.decode(token);
    const {id} = token_decode;
    return id;
}
export default usuarioSesion;