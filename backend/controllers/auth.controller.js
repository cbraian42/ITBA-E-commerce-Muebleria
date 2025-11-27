import User from "../models/User.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validación simple
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Faltan datos obligatorios." });
        }

        // Verificar si el usuario existe
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "El email ya está registrado." });
        }

        // Hashear contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario en DB
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Usuario registrado correctamente.",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.error("Error en register:", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
};
