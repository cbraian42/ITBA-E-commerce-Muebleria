// --- BLOQUE DE CARGA DE ENTORNO (Debe ir primero) ---
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

// 1. Obtenemos la ruta exacta de este archivo (server.js)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Forzamos a dotenv a buscar el archivo .env en la misma carpeta que server.js
const envPath = path.resolve(__dirname, '.env');
const result = dotenv.config({ path: envPath });

// --- BLOQUE DE DIAGNÓSTICO (Para ver qué pasa en la consola) ---
console.log("-----------------------------------------");
console.log("📍 Buscando archivo .env en:", envPath);
if (result.error) {
    console.log("❌ ERROR: No se encontró el archivo .env");
} else {
    console.log("✅ Archivo .env cargado correctamente");
}
console.log("🔍 MONGO_URI es:", process.env.MONGO_URI ? "DEFINIDO" : "UNDEFINED");
console.log("-----------------------------------------");
// --------------------------------------------------------

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { productsRouter } from "./routes/productRoutes.js";
import logger from './middleware/logger.js';
import { notFoundRoute, errorHandler } from './middleware/errorHandler.js';
import authRoutes from "./routes/auth.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Conexión
connectDB();

app.use(logger);
app.use("/auth", authRoutes);
app.use("/orders", orderRoutes);
app.use("/api/productos", productsRouter);

app.use(notFoundRoute);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});