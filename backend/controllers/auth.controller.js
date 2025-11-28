import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar datos
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Crear token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
    );

    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};