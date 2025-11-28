// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // 👈 Importar tu función
import { productsRouter } from "./routes/productRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import logger from './middleware/logger.js';
import { notFoundRoute, errorHandler } from './middleware/errorHandler.js';
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middlewares globales ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);

// --- Servir archivos estáticos ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- Conexión a MongoDB Atlas ---
connectDB(); // 👈 Usar tu función centralizada

// --- Middleware logger ---
app.use(logger);

// --- Rutas principales ---
app.use("/api/productos", productsRouter);

// --- Middleware para rutas no encontradas ---
app.use(notFoundRoute);

// --- Middleware de manejo de errores global ---
app.use(errorHandler);

// --- Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});