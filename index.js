import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import usuarioRoutes from "./routes/usuarioRoutes.js";
import propiedadesRoutes from "./routes/propiedadesRoutes.js";
import mensajeRoutes from "./routes/mensajeRoutes.js";
import conexion from "./config/db.js";
import appRoutes from "./routes/appRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
const app = express();

//Habilitar el template engine de pug y la carpeta donde estaran las vistass
app.set("view engine", "pug");
app.set("views", "./views");

//Habilitamos la lectura de formularios
app.use(express.urlencoded({ extended: true }));
//Habilitamos cookie-parser
app.use(cookieParser());
//Habilitamos csurf
app.use(csurf({cookie: true}));

//Carpeta publica
app.use(express.static("public"));

//Definimos las rutas para usuario
app.use("/auth", usuarioRoutes);
//Definimos rutass para propiedades
app.use("/", propiedadesRoutes);
//Definimos rutas generales de la aplicacion
app.use("/app", appRoutes);
//Definimos rutas para la api
app.use("/api", apiRoutes);
//Definimos rutas para la recepcion de mensajes
app.use("/msg", mensajeRoutes)


//Probamos conexion a la db
conexion.authenticate().then(() =>{
    console.log("Conexion correcta a la db")
}).catch(() =>{
    console.log("Error en la conexion a la db")
});

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log("Servidor corriendo desde el puerto 3000");
})