import categorias from "./categorias.js";
import precios from "./precios.js";
import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js";
import conexion from "../config/db.js";

const importarDatos = async () =>{
    try{
        //Autenticar en la base
        await conexion.authenticate();
        // Generar columnas
        await conexion.sync();
        //Insertar datos
        await Categoria.bulkCreate(categorias);
        console.log("Datos importados a la base de datos de manera crrecta")
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

const importarPrecios = async () =>{
    try {
        //Autenticar en la base de datos
        await conexion.authenticate();
        //Generar columnas
        await conexion.sync();
        //Insertar los datos
        await Precio.bulkCreate(precios);
        console.log("Datos de precios importados a la base de datos de manera correcta");
    }catch (error){
        console.log(error);
        process.exit(1);
    }
}

if (process.argv[2] === "-i"){
    importarDatos();
}else{
    importarPrecios();
}
