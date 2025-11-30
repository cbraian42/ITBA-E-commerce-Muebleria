import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/useAuth';
import { getCart, addItemToCart, removeItemFromCart, clearCartAPI } from '../api';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [], total: 0 });
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, token } = useAuth();

    const fetchCart = useCallback(async () => {
        if (isAuthenticated) {
            try {
                setLoading(true);
                const cartData = await getCart(token);
                setCart(cartData);
            } catch (error) {
                console.error("Error al cargar el carrito:", error);
                toast.error("No se pudo cargar tu carrito.");
                setCart({ items: [], total: 0 }); // Reinicia en caso de error
            } finally {
                setLoading(false);
            }
        } else {
            // Si no está autenticado, el carrito está vacío y no se carga nada
            setCart({ items: [], total: 0 });
            setLoading(false);
        }
    }, [isAuthenticated, token]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = async (product, quantity = 1) => {
        if (!isAuthenticated) {
            toast.error("Debes iniciar sesión para agregar productos al carrito.");
            return;
        }
        
        try {
            const existingItem = cart.items.find(item => item.product._id === product._id);
            const newQuantity = existingItem ? existingItem.quantity + quantity : quantity;
            
            const updatedCart = await addItemToCart(product._id, newQuantity, token);
            setCart(updatedCart);
            toast.success(`${product.name} agregado al carrito.`);
        } catch (error) {
            console.error("Error al agregar al carrito:", error);
            toast.error("No se pudo agregar el producto.");
        }
    };

    const removeFromCart = async (productId) => {
        if (!isAuthenticated) return;
        try {
            const updatedCart = await removeItemFromCart(productId, token);
            setCart(updatedCart);
            toast.success("Producto eliminado del carrito.");
        } catch (error) {
            console.error("Error al eliminar del carrito:", error);
            toast.error("No se pudo eliminar el producto.");
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated) return;
        try {
            const updatedCart = await clearCartAPI(token);
            setCart(updatedCart);
            toast.success("El carrito ha sido vaciado.");
        } catch (error) {
            console.error("Error al vaciar el carrito:", error);
            toast.error("No se pudo vaciar el carrito.");
        }
    };

    const cartCount = cart.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    const value = {
        cart, // El objeto de carrito ahora tiene { items: [], total: 0 }
        cartItems: cart.items || [], // Para mantener compatibilidad con componentes existentes
        cartTotal: cart.total || 0, // Para mantener compatibilidad
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        fetchCart // Exportamos para recargar si es necesario
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
