import { createContext, useState, useContext } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un hook personalizado para usar el contexto más fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// 3. Crear el Proveedor del Contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificar si el producto ya está en el carrito
      const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

      if (existingProductIndex !== -1) {
        // Si ya existe, actualizamos la cantidad
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        // Si no existe, lo agregamos al carrito
        return [...prevCart, product];
      }
    });
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const value = {
    cart,
    addToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};