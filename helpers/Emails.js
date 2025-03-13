// Importamo nodemailer y
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

//Helper para envio de emails para confirmar cuenta y para envio por olvidar password
const emailRegistro = async (datos) => {
    const {nombre, email, token} = datos;
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //Enviamos el email
    await transport.sendMail({
        from: "Bienes Raicees",
        to: email,
        subject: "CONFIRMA TU CUENTA EN BIENES RAICES",
        text: "CONFIRMA TU CUENTA EN BIENES RAICES",
        html: `
            <p>Hola ${nombre}, confirma tu cuenta en Bienes Raices</p>
            <p>Tu cuenta ya se encuentra lista, solo debes confirmarla en el siguiente enlace:
                <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Confirmar Cuenta</a>
            </p>
            <p>Si no has sido tú, por favor ignora este correo : )</p>
        `
    });
}

const emailRecuperarPassword = async (datos) =>{
    const {nombre, email, token} = datos;
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    //Enviamos el email
    await transport.sendMail({
        from: "BIENES RAICES",
        to: email,
        subject: "RECUPERAR PASSWORD",
        text: "RECUPERAR PASSWORD",
        html: `
            <p>
                Hola ${nombre}, por favor ingresa el siguiente link para recuperar tu password:
                <a href="${process.env.BACKEND_URL}/auth/recuperar/${token}">Recuperar Password</a>
            </p>
            <p>Si tú no solicitates la recuperacion de tu password, por favor ignora este correo : )</p>
        `
    });
}

const emailNuevoIntersado = async (datos) =>{
    const {email, nombre} = datos;

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transport.sendMail({
        from: "BIENES RAICES",
        to: email,
        subject: "HAY ALGUIEN INTERESADO EN TU PROPIEDAD",
        text: "HAY ALGUIEN INTERESADO EN TU PROPIEDAD",
        html: `
            Hola ${nombre}, hay alguien nuevo interesado en una de tu propiedadess, corre a ver quien es! : )
        `
    });
}
export {
    emailRegistro,
    emailRecuperarPassword,
    emailNuevoIntersado
}