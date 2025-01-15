//Importamos el modelo

//Funciones para el controlador usuario
const formularioLogion = (req, res) =>{
    res.render("auth/login");
}
const formularioRegistro = (req, res) =>{
    res.render("auth/registro")
}
export {
    formularioLogion,
    formularioRegistro
}