// server.js
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js'; // 👈 Importar tu función
import { productosRouter } from "./routers/productos.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middlewares globales ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Servir archivos estáticos ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// --- Conexión a MongoDB Atlas ---
connectDB(); // 👈 Usar tu función centralizada

// --- Rutas principales ---
app.use("/api/productos", productosRouter);

// --- Middleware logger ---
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- Middleware para rutas no encontradas ---
app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// --- Middleware de manejo de errores global ---
app.use((err, req, res, next) => {
  console.error("Error en el servidor:", err.message);
  res.status(500).json({ error: "Error interno del servidor" });
});

// --- Iniciar servidor ---
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});