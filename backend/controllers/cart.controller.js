import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Obtener el carrito del usuario
export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.findOne({ user: userId }).populate({
            path: 'items.product',
            model: 'Product'
        });

        if (!cart) {
            // Si no existe, crea un carrito vacío para el usuario
            cart = await Cart.create({ user: userId, items: [] });
        }

        // Transformar URLs de imágenes
        const cartObj = cart.toObject();
        if (cartObj.items) {
            cartObj.items = cartObj.items.map(item => {
                if (item.product && item.product.image) {
                    item.product.image = `${req.protocol}://${req.get('host')}/images/${item.product.image}`;
                }
                return item;
            });
        }

        res.status(200).json(cartObj);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Agregar un item al carrito o actualizar su cantidad
export const addItemToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Datos de producto o cantidad inválidos." });
    }

    try {
        // Verificar que el producto existe
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado." });
        }

        let cart = await Cart.findOne({ user: userId });

        // Si no hay carrito, se crea uno
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // El producto ya está en el carrito, se actualiza la cantidad
            cart.items[itemIndex].quantity = quantity;
        } else {
            // El producto no está en el carrito, se agrega
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        
        // Populamos para devolver el carrito actualizado con detalles
        const updatedCart = await Cart.findById(cart._id).populate({
            path: 'items.product',
            model: 'Product'
        });

        // Transformar URLs de imágenes
        const cartObj = updatedCart.toObject();
        if (cartObj.items) {
            cartObj.items = cartObj.items.map(item => {
                if (item.product && item.product.image) {
                    item.product.image = `${req.protocol}://${req.get('host')}/images/${item.product.image}`;
                }
                return item;
            });
        }

        res.status(200).json(cartObj);

    } catch (error) {
        console.error("Error al agregar item al carrito:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Remover un item del carrito
export const removeItemFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Carrito no encontrado." });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito." });
        }

        cart.items.splice(itemIndex, 1);
        await cart.save();
        
        // Populamos para devolver el carrito actualizado con detalles
        const updatedCart = await Cart.findById(cart._id).populate({
            path: 'items.product',
            model: 'Product'
        });

        // Transformar URLs de imágenes
        const cartObj = updatedCart.toObject();
        if (cartObj.items) {
            cartObj.items = cartObj.items.map(item => {
                if (item.product && item.product.image) {
                    item.product.image = `${req.protocol}://${req.get('host')}/images/${item.product.image}`;
                }
                return item;
            });
        }

        res.status(200).json(cartObj);

    } catch (error) {
        console.error("Error al eliminar item del carrito:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};

// Limpiar todos los items del carrito
export const clearCart = async (req, res) => {
    const userId = req.user.id;

    try {
        let cart = await Cart.findOne({ user: userId });
        if (cart) {
            cart.items = [];
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).json({ message: "Carrito no encontrado." });
        }
    } catch (error) {
        console.error("Error al limpiar el carrito:", error);
        res.status(500).json({ message: "Error del servidor." });
    }
};
