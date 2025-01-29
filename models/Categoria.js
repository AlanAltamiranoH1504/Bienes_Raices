import sequelize from "sequelize";
import conexion from "../config/db.js";

const categoria = conexion.define("categorias", {
    nombre: {
        type: sequelize.STRING,
        required: true,
    }
});
export default categoria;