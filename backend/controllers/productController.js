import Product from '../models/Product.js';


// GET /api/productos  -> obtener todos
export const listProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).lean();

        const productsWithImageUrls = products.map(p => ({
            ...p,
            image: p.image ? `${req.protocol}://${req.get('host')}/images/${p.image}` : null,
        }));

        res.json(productsWithImageUrls);
    } catch (err) {
        next(err);
    }
};

// GET /api/productos/:id -> obtener por id
export const listProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).json({ message: `Producto con id '${req.params.id}' no encontrado` });

        const imageUrl = product.image ? `${req.protocol}://${req.get('host')}/images/${product.image}` : null;

        res.json({ ...product, image: imageUrl });
    } catch (err) {
        next(err);
    }
};

// POST /api/productos -> crear producto con features embebidas
export const addProduct = async (req, res, next) => {
    try {
        const { name, price, description, image,stock, features } = req.body;
        const newProduct = await Product.create({ name, price, description, image,stock, features });
        res.status(201).json(newProduct);
    } catch (err) {
        next(err);
    }
};

// PUT /api/productos/:id -> actualizar producto (reemplaza campos enviados)
export const updateProduct = async (req, res, next) => {
    try {
        const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updated) return res.status(404).json({ message: `Producto con id '${req.params.id}' no encontrado` });
        res.json(updated);
    } catch (err) {
        next(err);
    }
};

// DELETE /api/productos/:id -> borrar
export const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: `Producto con id '${req.params.id}' no encontrado` });
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
        next(err);
    }
};

