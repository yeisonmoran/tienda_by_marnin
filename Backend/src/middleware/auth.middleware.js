import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const datos = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = datos;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token invalido o expirado" });
    }
}



export function verificarRol(...rolesPermitidos) {

    return (req, res, next) => {
        if (!rolesPermitidos.includes(req.usuario.idRol)) {
            return res.status(403).json({ error: "No tienes permisos para esta accion" });
        }
        next();
    };
}