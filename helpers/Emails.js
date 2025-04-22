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
        from: "Bienes Raices <no-reply@bienesraices.com>",
        to: email,
        subject: "CONFIRMA TU CUENTA EN BIENES RAICES",
        text: "Confirma tu cuenta en Bienes Raíces",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
            <h2 style="color: #2c3e50;">Hola ${nombre},</h2>
            <p style="font-size: 16px; color: #333;">
                Gracias por registrarte en <strong>Bienes Raíces</strong>. Para activar tu cuenta, por favor confirma tu dirección de correo electrónico haciendo clic en el siguiente enlace:
            </p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}" 
                   style="display: inline-block; padding: 12px 25px; background-color: #3498db; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Confirmar Cuenta
                </a>
            </p>
            <p style="font-size: 14px; color: #666;">
                Si tú no creaste esta cuenta, puedes ignorar este mensaje sin problemas.
            </p>
            <p style="font-size: 14px; color: #999; margin-top: 40px;">
                &copy; ${new Date().getFullYear()} Bienes Raíces. Todos los derechos reservados.
            </p>
        </div>
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
        from: "Bienes Raíces <no-reply@bienesraices.com>",
        to: email,
        subject: "RECUPERAR PASSWORD",
        text: "Recuperar tu contraseña en Bienes Raíces",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
            <h2 style="color: #2c3e50;">Hola ${nombre},</h2>
            <p style="font-size: 16px; color: #333;">
                Hemos recibido una solicitud para restablecer tu contraseña en <strong>Bienes Raíces</strong>. Puedes hacerlo haciendo clic en el siguiente enlace:
            </p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="${process.env.BACKEND_URL}/auth/recuperar/${token}" 
                   style="display: inline-block; padding: 12px 25px; background-color: #e67e22; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Recuperar Password
                </a>
            </p>
            <p style="font-size: 14px; color: #666;">
                Si tú no solicitaste este cambio, puedes ignorar este mensaje.
            </p>
            <p style="font-size: 14px; color: #999; margin-top: 40px;">
                &copy; ${new Date().getFullYear()} Bienes Raíces. Todos los derechos reservados.
            </p>
        </div>
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
        from: "Bienes Raíces <no-reply@bienesraices.com>",
        to: email,
        subject: "¡Hay alguien interesado en tu propiedad!",
        text: "Hay alguien interesado en tu propiedad en Bienes Raíces.",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f8f8f8; border-radius: 10px;">
            <h2 style="color: #2c3e50;">Hola ${nombre},</h2>
            <p style="font-size: 16px; color: #333;">
                ¡Hay alguien nuevo interesado en una de tus propiedades!
            </p>
            <p style="font-size: 16px; color: #333;">
                Corre a ver quién es 😊
            </p>
            <p style="font-size: 14px; color: #999; margin-top: 40px;">
                &copy; ${new Date().getFullYear()} Bienes Raíces. Todos los derechos reservados.
            </p>
        </div>
    `
    });
}
export {
    emailRegistro,
    emailRecuperarPassword,
    emailNuevoIntersado
}