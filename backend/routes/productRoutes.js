import express from 'express';
import { listProducts, listProduct, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import validateObjectId from '../middleware/validateObjectId.js';
import { verifyToken, verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Rutas públicas
router.get('/', listProducts);
router.get('/:id', validateObjectId, listProduct);

// Rutas protegidas para ADMIN
router.post('/', verifyToken, verifyAdmin, addProduct);
router.put('/:id', validateObjectId, verifyToken, verifyAdmin, updateProduct);
router.delete('/:id', validateObjectId, verifyToken, verifyAdmin, deleteProduct);

export { router as productsRouter };


