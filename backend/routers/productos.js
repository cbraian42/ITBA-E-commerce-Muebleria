const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const productosRouter = express.Router();

const filePath = path.join(__dirname, "../data/productos.json");

//funcion para leer productos (del archivo json)
const leerProductos = async ()=>{
    const data = await fs.readFile(filePath,"utf-8");
    return JSON.parse(data);
};

// GET → Todos los productos
productosRouter.get("/", async (req, res, next) => {
  try {
    const productos = await leerProductos();
    res.json(productos);
  } catch (error) {
    next(error); // lo enviamos al manejador de errores central
  }
});

// GET → Producto específico por ID
productosRouter.get("/:id", async (req, res, next) => {
  try {
    const productos = await leerProductos();
    // Convertir el ID de la URL a número y guardarlo en una variable
    const idBuscado = parseInt(req.params.id);
    // Usar find() y asegurar que AMBOS ID sean números para la comparación
    const producto = productos.find(p => parseInt(p.id) === idBuscado);
    // --- Lógica de respuesta ---
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    next(error);
  }
});


module.exports = {productosRouter};