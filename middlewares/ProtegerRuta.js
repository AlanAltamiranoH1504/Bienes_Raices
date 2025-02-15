import jwt from "jsonwebtoken";
import usuario from "../models/Usuario.js";
const protegerRuta = async (req, res, next) =>{
    //Verificamos si hay el token
    const token = req.cookies.token;
    if (!token){
        res.redirect('/auth/login');
    }
    //Comprobamos el token
    try{
        //Decodificamos el token
        const decodificacion = jwt.verify(token, process.env.JWT_SECRET);
        const {id} = decodificacion;
        if(!id){
            res.redirect('/auth/login');
        }
        const usuarioDb = await usuario.findOne({where: id});
        if(usuarioDb !== null){
            next();
        }else{
            res.redirect("auth/login");
        }
    }catch (e){
        return res.clearCookie("token").redirect("/auth/login");
    }
}
export default protegerRuta;