import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Helper que ayuda a la generacion de tokens de manera automatica
const generarId = () =>{
    return Date.now().toString(32) + Math.random().toString(32).substring(2);
}
//Helper que genera un JWT
const generaJWT = (id) =>{
    const token = jwt.sign({
        id: id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    return token;
}
export {
    generarId,
    generaJWT
}
