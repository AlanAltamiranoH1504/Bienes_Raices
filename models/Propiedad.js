import sequelize from "sequelize";
import conexion from "../config/db.js";

const propiedad = conexion.define("propiedades", {
    titulo: {
        type: sequelize.STRING(50),
        required: true
    },
    descripcion:{
        type: sequelize.STRING(500),
        required: true
    },
    habitaciones:{
        type: sequelize.INTEGER,
        required: true
    },
    estacionamiento: {
        type: sequelize.INTEGER,
        required: true
    },
    wc: {
        type: sequelize.INTEGER,
        required: true
    },
    calle: {
        type: sequelize.STRING,
        required: true
    },
    lat: {
        type: sequelize.STRING,
        required: true
    },
    lng: {
        type: sequelize.STRING,
        required: true
    },
    imagen: {
        type: sequelize.STRING,
        required: true
    },
    publicado:{
        type: sequelize.BOOLEAN,
        default: false
    },
    categoria_id:{
        type: sequelize.INTEGER,
        required: true,
    },
    precio_id: {
        type: sequelize.INTEGER,
        required: true
    },
});
export default propiedad;