import sequelize from "sequelize";
import conexion from "../config/db.js";

const propiedad = conexion.define("propiedad", {
    titulo: {
        type: sequelize.STRING(50),
        required: true
    },
    descripcion:{
        type: sequelize.STRING(500),
        required: true
    },
    // categoria:{
    //     type: sequelize.STRING,
    //     required: true
    // },
    // precio: {
    //     type: sequelize.STRING,
    //     required: true
    // },
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
        allowNull: false,
        default: false
    }
});
export default propiedad;