import express from 'express';
import usuarioRoutes from "./routes/usuarioRoutes.js";
const app = express();

//Habilitar el template engine de pug y la carpeta donde estaran las vistass
app.set("view engine", "pug");
app.set("views", "./views");
//Carpeta publica
app.use(express.static("public"));

//Definimos las rutas para usuario
app.use("/auth", usuarioRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () =>{
    console.log("Servidor corriendo desde el puerto 3000");
})