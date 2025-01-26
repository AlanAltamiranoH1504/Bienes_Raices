
const admin = (req, res) =>{
    // res.send("Desde la pagina home de propiedades")
    res.render("propiedades/admin", {
        pagina: "Mis propiedades",
        barra: true
    });
}

const formCrearPropiedad = (req, res) =>{
    res.render("propiedades/formCrearPropiedad", {
        pagina: "Crear Nueva Propiedad",
        barra: true,
        csrf: req.csrfToken()
    })
}

export {
    admin,
    formCrearPropiedad
}