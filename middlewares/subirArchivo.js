import multer from "multer";
import path from "path";
import {generarId} from "../helpers/Tokens.js";

const storage = multer.diskStorage({
    //Lugar donde se guardan los archivos
    destination: function (req, file, cb){
        cb(null, './public/uploads/');
    },
    //Mandamos el archivo
    filename: function (req, file, cb){
        cb(null, generarId() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

export default upload;