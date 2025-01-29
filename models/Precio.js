import sequelize from "sequelize";
import conexion from "../config/db.js";

const precio = conexion.define("precios", {
    nombre: {
        type: sequelize.STRING,
        required: true,
    }
});

export default precio;