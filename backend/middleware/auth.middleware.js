import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Si no existe header
    if (!authHeader) {
      return res.status(401).json({ message: "No se proporcionó token." });
    }

    // El formato debe ser "Bearer token"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token inválido." });
    }

    // Verificamos el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscamos usuario real en base al id del token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Adjuntamos usuario al request
    req.user = user;

    next(); // <-- continúa a la ruta protegida
  } catch (error) {
    console.error("Error en verifyToken:", error);
    return res.status(401).json({ message: "Token inválido o expirado." });
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Solo administradores." });
  }
  next();
};
