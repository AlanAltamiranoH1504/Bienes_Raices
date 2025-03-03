import {Categoria, Precio, Propiedad} from "../models/index.js";

const propiedades = async (req, res) => {
    const propiedades = await Propiedad.findAll({
        include: [
            {model: Categoria, attributes: ['id', 'nombre']},
            {model: Precio, attributes: ['id', 'nombre']}
        ]
    });

    res.json({
        propiedades: propiedades
    })
}

export {
    propiedades
}