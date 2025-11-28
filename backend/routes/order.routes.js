import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Crear pedido (solo usuarios autenticados)
router.post("/", verifyToken, createOrder);

export default router;
