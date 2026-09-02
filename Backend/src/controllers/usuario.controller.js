import prisma from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function listarUsuarios(req, res) {

    try {
        const usuarios = await prisma.usuario.findMany(
           
        );
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al listar usuarios" });

    }
}


export async function obtenerUsuario(req, res) {
    try {
        const { id } = req.params;

        const usuarios = await prisma.usuario.findUnique({
            where: { id_usuario: Number(id) },
        });

        if (!usuarios) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        const { contrasena: _, ...usuarioSinContrasena } = usuarios;
        res.json(usuarioSinContrasena);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener usuario" });
    }
}



export async function registrarUsuario(req, res) {

    try {
        const { nombre, correo, contrasena, idRol, idTipoDocumento, numDocumento } = req.body;

        if (nombre === undefined || nombre === null || nombre === "") {
            return res.status(400).json({
                error: "El nombre es obligatorio"
            });
        }
        if (!correo || correo.trim() === "") {

            return res.status(400).json({
                error: "El correo es obligatorio"
            });
        }

        if (correo.length > 60) {
            return res.status(400).json({
                error: "Demasiados caracteres minimo 60"
            });
        }

        if (contrasena === undefined || contrasena === null || contrasena === "") {

            return res.status(400).json({
                error: "La contraseña es obligatorio"
            });
        }

        if (!idRol) {

            return res.status(400).json({
                error: "El rol es obligatorio"
            });
        }
        if (!idTipoDocumento) {

            return res.status(400).json({
                error: "El tipo de documento es obligatorio"
            });
        }
        if (!numDocumento || numDocumento.trim() === "") {

            return res.status(400).json({
                error: "El documento es obligatorio"
            });
        }
        if (numDocumento.length > 10) {

            return res.status(400).json({
                error: "Solo 10 digitos"
            });
        }

        const passwordHasheada = await bcrypt.hash(contrasena, 10);

        const nuevoUsuario = await prisma.usuario.create({
            data: { nombre, correo, contrasena: passwordHasheada, idRol, idTipoDocumento, numDocumento }
        });

        res.status(201).json(nuevoUsuario);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al registrar usuario" });

    }

}



export async function editarUsuario(req, res) {

    try {
        const { id } = req.params;
        const { nombre, correo, contrasena, idRol } = req.body;

        let contrasenaFinal = undefined;

        if (contrasena) {
            contrasenaFinal = await bcrypt.hash(contrasena, 10);
        }

        const usuarioActualizado = await prisma.usuario.update({
            where: { id_usuario: Number(id) },
            data: { nombre, correo, contrasena: contrasenaFinal, idRol }
        });

        res.json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al editar usuario" });
    }

}

export async function eliminarUsuario(req, res) {
    try {
        const { id } = req.params;

        await prisma.usuario.update({

            where: { id_usuario: Number(id) },
            data: { activo: false },
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
}

export async function autenticarUsuario(req, res) {
    try {

        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: "Credenciales invalidas" });
        }

        const usuario = await prisma.usuario.findUnique({
            where: { correo },
        });

        if (!usuario.activo) {

            return res.status(401).json({ error: "credenciales invalidas" });
        }

        const coincide = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!coincide) {
            return res.status(401).json({ error: "Credenciales invalidas" });
        }

        const token = jwt.sign(
            { idUsuario: usuario.id_usuario, idRol: usuario.idRol },
            process.env.JWT_SECRET,
            { expiresIn: "8h" },
        );

        const { contrasena: _, ...usuarioSinContrasena } = usuario;

        res.json({
            usuario: usuarioSinContrasena,
            token,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al autenticar usuario" });
    }
}




