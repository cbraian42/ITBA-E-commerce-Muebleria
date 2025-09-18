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

//funcion para "en un futuro" agregar productos

//GET para todos los productos
//ruta "/"

//GET para producto especifico via ID
// ruta "/:id"

//POST para "en un futuro" agregar productos

module.exports = {productosRouter};