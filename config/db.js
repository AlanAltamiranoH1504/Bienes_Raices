import sequelize, {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const conexion = new Sequelize( process.env.DB_NOMBRE, process.env.DB_USER, process.env.DB_PASSWORD , {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true
    }
});
export  default conexion;