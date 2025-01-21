import sequelize from 'sequelize';
import conexion from "../config/db.js";

const usuario = conexion.define("usuario", {
    nombre: {
        type: sequelize.STRING,
        allowNull: false
    },
    email: {
        type: sequelize.STRING,
        allowNull: false
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    token: {
        type: sequelize.STRING
    },
    confirmado:{
        type: sequelize.BOOLEAN
    }
});

export default usuario;