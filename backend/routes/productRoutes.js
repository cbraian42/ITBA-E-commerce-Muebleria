import express from 'express';
import {listProducts, listProduct, addProduct, updateProduct, deleteProduct  } from '../controllers/productController.js';
import validateObjectId from '../middleware/validateObjectId.js';
const router = express.Router();

router.get('/',listProducts);
router.get('/:id',validateObjectId,listProduct);
router.post('/',addProduct);
router.put('/:id',validateObjectId,updateProduct);
router.delete('/:id',validateObjectId,deleteProduct);

export { router as productsRouter };


