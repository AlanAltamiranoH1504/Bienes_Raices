import express from "express";
import sequelize, {Sequelize} from "sequelize";
import conexion from "../config/db.js";

const mensaje = conexion.define("mensajes", {
    mensaje: {
        type: sequelize.STRING,
        required: true,
        allowNull: false,
    }
});

export default mensaje;