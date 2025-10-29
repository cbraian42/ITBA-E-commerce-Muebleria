import express from 'express';
import Product from '../models/Product.js'; // 👈 Agregar .js

const router = express.Router();

// GET /api/productos  -> obtener todos
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/productos/:id -> obtener por id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// POST /api/productos -> crear producto con features embebidas
router.post('/', async (req, res, next) => {
  try {
    const { name, price, description, image, features } = req.body;
    const newProduct = await Product.create({ name, price, description, image, features });
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
});

// PUT /api/productos/:id -> actualizar producto (reemplaza campos enviados)
router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/productos/:id -> borrar
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    next(err);
  }
});

export { router as productosRouter }; // 👈 Cambio aquí