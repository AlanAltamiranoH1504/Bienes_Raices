//Importamos el modelo
import usuario from "../models/Usuario.js";
import {generaJWT} from "../helpers/Tokens.js";
import bcrypt from "bcrypt";

import {generarId} from "../helpers/Tokens.js";
import {emailRegistro, emailRecuperarPassword} from "../helpers/Emails.js";
import {underscoredIf} from "sequelize/lib/utils";

//Funciones para el controlador usuario
const formularioLogion = (req, res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesión",
        csrf: req.csrfToken()
    });
}
const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: 'Crear Cuenta',
        csrf: req.csrfToken()
    });
}
const olvidePassword = (req, res) => {
    res.render("auth/olvide-password", {
        pagina: "Recupera tu Password",
        csrf: req.csrfToken()
    });
}
const saveUsuario = async (req, res) => {
    const {nombre, email, password, password2} = req.body;

    //Verificamos que el email sea unico
    const unico = await usuario.findOne({where: {email: email}});
    if (nombre.trim() == "" || email.trim() == "" || password.trim() == "") {
        res.render("auth/registro", {
            pagina: "Crear Cuenta",
            error: true,
            mensaje: "Todos los campos son obligatorios"
        });
    } else if (password.length < 6) {
        res.render("auth/registro", {
            pagina: "Crear Cuenta",
            error: true,
            mensaje: "Password muy corta. Debe ser mayor a 6 caracteres",
            usuario: {
                nombre, email
            }
        });
    } else if (password !== password2) {
        res.render("auth/registro", {
            pagina: "Crear Cuenta",
            error: true,
            mensaje: "Las password no coinciden",
            usuario: {
                nombre, email
            }
        });
    } else if (unico !== null) {
        res.render("auth/registro", {
            pagina: "Crear Cuenta",
            error: true,
            mensaje: "El usuario ya se encuentra registrado",
            usuario: {
                nombre
            }
        });
    } else {
        //Hasheamos la password
        const passwordHash = await bcrypt.hash(password, 10);
        const usuarioGuardar = await usuario.create({nombre, email, password: passwordHash, token: generarId()});
        //Enviamos email de confirmacion
        emailRegistro(usuarioGuardar)

        res.render("auth/registro", {
            pagina: "Crear Cuenta",
            error: false,
            mensaje: "Usuario registrado! Confirma tu Cuenta"
        });
    }
}

const confirmar = async (req, res) => {
    const token = req.params.token;
    //Confirmamos el token
    const usuarioParaConfirmar = await usuario.findOne({where: {token: token}});
    //Actualizamos ese usuario con ese token
    if (usuarioParaConfirmar !== null) {
        usuarioParaConfirmar.confirmado = true;
        usuarioParaConfirmar.token = null;
        await usuarioParaConfirmar.save();
        res.render("auth/confirmacion", {
            respuesta: "CUENTA CONFIRMADA CON EXITO!",
            pagina: "Confirmacion"
        });
    } else {
        res.render("auth/confirmar-error", {
            respuesta: "TOKEN NO VALIDO",
            pagina: "Confirmacion"
        });
    }
}

const recuperarPassword = async (req, res) => {
    const emailRequest = req.body.email;
    const usuarioExistente = await usuario.findOne({where: {email: emailRequest}});
    if (usuarioExistente !== null) {
        const token = generarId();
        usuarioExistente.token = token;
        usuarioExistente.save();

        const {nombre, email} = usuarioExistente;
        emailRecuperarPassword({nombre, email, token});
        res.render("auth/olvide-password", {
            pagina: "Recupera tu password",
            mensaje: "Revisa tu email para recuperar tu password",
            error: false,
            csrf: req.csrfToken()
        })
    } else {
        res.render("auth/olvide-password", {
            pagina: "Recupera tu password",
            mensaje: "No hay ningun usuario registrado con ese email",
            error: true,
            csrf: req.csrfToken()
        })
    }
}

const formularioRecuperacion = async (req, res) => {
    const tokenRequest = req.params.token;
    const usuarioExistente = await usuario.findOne({where: {token: tokenRequest}});
    if (usuarioExistente !== null) {
        usuarioExistente.token = null;
        usuarioExistente.save();
        res.render("auth/formulario-recuperacion", {
            pagina: "Recuperacion de mi Password",
            csrf: req.csrfToken(),
            email: usuarioExistente.email
        })
    } else {
        res.render("auth/formulario-recuperacion", {
            pagina: "Recuperacion de mi Password",
            csrf: req.csrfToken(),
            error: true,
            mensaje: "Token expirado"
        })
    }
}

const actualizarPassword = async (req, res) => {
    const {email, password1, password2} = req.body;
    const passwordHash = await bcrypt.hash(password1, 10);
    await usuario.update({password: passwordHash}, {where: {email}});
    res.render("auth/formulario-recuperacion", {
        pagina: "Recuperacion de mi Password",
        csrf: req.csrfToken(),
        error: false,
        mensaje: "Password Actualizada"
    })
}

const validacionLogion = async (req, res) => {
    const {email, password} = req.body;
    if (email.trim() === "" || email == null || password.trim() === "" || password == null) {
        res.render("auth/login", {
            error: true,
            mensaje: "Los campos son obligatorios",
            pagina: "Iniciar Sesión",
            csrf: req.csrfToken()
        });
        return;
    }

    const usuarioExistente = await usuario.findOne({where: {email: email}});
    //Compramos que existe el usuario y que este confirmado
    if (usuarioExistente === null) {
        res.render("auth/login", {
            error: true,
            mensaje: "Usuario no existente",
            pagina: "Iniciar Sesión",
            csrf: req.csrfToken()
        });
        return;
    }
    if (usuarioExistente.confirmado == false || usuarioExistente.confirmado == null) {
        res.render("auth/login", {
            error: true,
            mensaje: "No has confirmado tu cuenta",
            pagina: "Iniciar Sesión",
            csrf: req.csrfToken()
        });
        return;
    }

    //Si el usuario existe y ya tiene confirmada su cuenta
    if (usuarioExistente && usuarioExistente.confirmado === true) {
        const correctPassword = await bcrypt.compare(password, usuarioExistente.password);
        if (correctPassword) {
            //Generamos y guardamos el JWT en una cookie
            const token = generaJWT(usuarioExistente.id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60
            }).redirect("/mis-propiedades");
        } else {
            res.render("auth/login", {
                error: true,
                mensaje: "Tu password es incorrecta",
                pagina: "Iniciar Sesión",
                email: email,
                csrf: req.csrfToken()
            });
        }
    }
}

const cerrarSesion = (req, res) => {
    res.clearCookie("token");
    res.redirect("auth/login");
}

export {
    formularioLogion,
    formularioRegistro,
    olvidePassword,
    saveUsuario,
    confirmar,
    recuperarPassword,
    formularioRecuperacion,
    actualizarPassword,
    validacionLogion,
    cerrarSesion
}