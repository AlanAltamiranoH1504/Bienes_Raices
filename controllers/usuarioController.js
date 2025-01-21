//Importamos el modelo
import usuario from "../models/Usuario.js";
import usuarioRoutes from "../routes/usuarioRoutes.js";

//Funciones para el controlador usuario
const formularioLogion = (req, res) =>{
    res.render("auth/login",{
        pagina: "Iniciar Sesión"
    });
}
const formularioRegistro = (req, res) =>{
    res.render("auth/registro", {
        pagina: 'Crear Cuenta'
    })
}
const olvidePassword = (req, res) =>{
    res.render("auth/olvide-password", {
        pagina: "Recupera tu Password"
    })
}
const saveUsuario = async (req, res) =>{
    const {nombre, email, password, password2} = req.body;

    //Verificamos que el email sea unico
    const unico = await usuario.findOne({where: {email: email}});
    if (nombre.trim() == "" || email.trim() == "" || password.trim() == ""){
        return res.json({msg: "Campos vacios"});
    }else if(password.length < 6){
        return res.json({msg: "Password muy corta. Debe ser mayor a 6 caracteres"});
    } else if(password !== password2){
        return res.json({msg: "Las password no coinciden"});
    } else if (unico !== null){
        return  res.json({msg: "Usuario ya registrado"});
    }else{
        const usuarioGuardar = await usuario.create({nombre, email, password});
        res.json(usuarioGuardar);
    }
}

export {
    formularioLogion,
    formularioRegistro,
    olvidePassword,
    saveUsuario
}