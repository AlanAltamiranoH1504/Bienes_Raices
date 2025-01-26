
const admin = (req, res) =>{
    // res.send("Desde la pagina home de propiedades")
    res.render("propiedades/admin", {
        pagina: "Mis propiedades",
        barra: true
    });
}

export {
    admin
}