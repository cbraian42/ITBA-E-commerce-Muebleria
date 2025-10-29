// --- Dependencias ---
require('dotenv').config();         // 👈 para leer el archivo .env
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 👈 agregamos mongoose
const { productosRouter } = require("./routers/productos");

const app = express();
const PORT = process.env.PORT || 4000;

// --- Middlewares globales ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Conexión a MongoDB Atlas ---
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado correctamente a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error al conectar con MongoDB:', error.message);
    process.exit(1); // Detiene el servidor si no hay conexión
  }
}
connectDB();

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
