import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, async (req, res) => {
  return res.json({
    message: "Perfil del usuario autenticado",
    user: req.user
  });
});

export default router;