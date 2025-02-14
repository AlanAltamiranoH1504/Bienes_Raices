import {Dropzone} from 'dropzone'

Dropzone.options.imagen = {
    dictDefaultMessage: "Sube tus imagenes aquí",
    dictRemoveFile: "Borrar archivo",
    dictMaxFilesExceeded: "No pudes subir mas de un archivo",
    acceptedFiles: ".png, .jpg, .jpeg",
    maxSize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true
}