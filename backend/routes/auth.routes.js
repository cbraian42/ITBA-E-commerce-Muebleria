import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";
import multer from "multer";
import User from "../models/User.js";
const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/avatars",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/register", register);
router.post("/login", login);

router.get("/profile", verifyToken, (req, res) => {
  return res.json({
    message: "Perfil del usuario autenticado",
    user: req.user
  });
});

// Subir o cambiar avatar
router.put("/upload-avatar", verifyToken, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen." });
    }

    // Buscar al usuario en DB
    const user = await User.findById(req.user._id);

    // Guardar el path en la base
    user.avatar = `/uploads/avatars/${req.file.filename}`;
    await user.save();

    res.json({
      message: "Avatar actualizado correctamente",
      avatar: user.avatar
    });

  } catch (error) {
    console.error("Error al subir avatar:", error);
    res.status(500).json({ message: "Error al subir avatar." });
  }
});


export default router;