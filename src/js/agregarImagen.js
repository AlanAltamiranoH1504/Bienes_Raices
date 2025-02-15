import {Dropzone} from 'dropzone'

//Leemos el token que se encuentra dentro del meta en el head o en el input oculto
const input_token = document.querySelector("#crsf_token");
const value_token = input_token.getAttribute("value");

//Configuramos dropzone a nuestras neceisidades
Dropzone.options.imagen = {
    dictDefaultMessage: "Sube tus imagenes aquí", //Modificamos el texto del recuadro por defecto
    dictRemoveFile: "Borrar archivo", // Modificamos el mensaje para eliminar archivo
    dictMaxFilesExceeded: "No pudes subir mas de un archivo", // Modificamos el mensaje de numero de archivos excedido
    acceptedFiles: ".png, .jpg, .jpeg", // Formatos de archivo validos
    maxFilesize: 5, //Tamaño maxinmo de archivos en mb
    maxFiles: 1, // Cantidad maxima de archivos
    parallelUploads: 1,
    autoProcessQueue: false, //Impide que la imagen se suba de manera automatica
    addRemoveLinks: true, // Agregar posibilidad de eliminar imagen
    //Agregamos headers antes de la peticion para evitar error con el token
    headers: {
        'CSRF-Token': value_token
    },
    paramName: 'imagen',
    init: function (){
        //Guardamos los archivos cuando se da click en el boton para guardar archivos
        const dropZone = this;
        const btnPublicar = document.querySelector("#publicar");

        btnPublicar.addEventListener("click", () =>{
            dropZone.processQueue()
        });
        dropZone.on('queuecomplete', function (){
            if (dropZone.getActiveFiles().length == 0){
                window.location.href = '/mis-propiedades';
            }
        });
    }
}