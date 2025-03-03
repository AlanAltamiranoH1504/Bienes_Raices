const inicio = (req, res) => {
    res.render("inicio", {
        barra_inicio:true,
        pagina: "Inicio"
    });
}

const pagina404 = (req, res) => {
    res.send("Pagina 404");
}

const categorias = (req, res) => {
    res.send("Pagina de categorias");

}

const buscador = (req, res) => {
    res.send("Pagina de buscador");
}

export {
    inicio,
    pagina404,
    categorias,
    buscador
}