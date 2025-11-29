import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Carts.css'; 

const Cart = () => {
    const { cart, removeFromCart, clearCart, calculateTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="cart-empty-container">
                <h2>Tu carrito está vacío</h2>
                <p>Parece que no has agregado nada aún.</p>
                <Link to="/productos" className="btn-return">Ir al catálogo</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Tu Carrito de Compras</h1>
            
            <div className="cart-grid">
                {/* Lista de Productos */}
                <div className="cart-items">
                    {cart.map((product) => (
                        <div key={product.id} className="cart-item">
                            <img 
                                src={product.image || "https://placehold.co/100"} 
                                alt={product.name} 
                                className="cart-item-img"
                            />
                            <div className="cart-item-details">
                                <h3>{product.name}</h3>
                                <p className="cart-item-price">${product.price?.toLocaleString('es-AR')}</p>
                            </div>
                            
                            <div className="cart-item-actions">
                                <span className="quantity-label">Cant: {product.quantity}</span>
                                <button 
                                    onClick={() => removeFromCart(product.id)}
                                    className="btn-remove"
                                >
                                    Eliminar
                                </button>
                            </div>
                            
                            <div className="cart-item-subtotal">
                                <p>Subtotal:</p>
                                <strong>${(product.price * product.quantity).toLocaleString('es-AR')}</strong>
                            </div>
                        </div>
                    ))}
                    
                    <button onClick={clearCart} className="btn-clear-cart">
                        Vaciar Carrito
                    </button>
                </div>

                {/* Resumen de Compra */}
                <div className="cart-summary">
                    <h2>Resumen</h2>
                    <div className="summary-row">
                        <span>Total de productos:</span>
                        <span>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total a pagar:</span>
                        <span>${calculateTotal().toLocaleString('es-AR')}</span>
                    </div>
                    
                    <button className="btn-checkout">Finalizar Compra</button>
                    <Link to="/productos" className="link-continue">Seguir comprando</Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;