import express from "express";
import {
    getCart,
    addItemToCart,
    removeItemFromCart,
    clearCart
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Todas las rutas de carrito requieren autenticación
router.use(verifyToken);

// Obtener el carrito del usuario
router.get("/", getCart);

// Agregar un item al carrito o actualizarlo
router.post("/items", addItemToCart);

// Eliminar un item del carrito
router.delete("/items/:productId", removeItemFromCart);

// Limpiar el carrito
router.delete("/", clearCart);

export default router;
