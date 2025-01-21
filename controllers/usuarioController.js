//Importamos el modelo

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

export {
    formularioLogion,
    formularioRegistro,
    olvidePassword
}