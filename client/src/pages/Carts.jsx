import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../auth/useAuth';
import { Link } from 'react-router-dom';
import './Carts.css';
import { FaTrashAlt } from 'react-icons/fa'; // Icono para eliminar

import { createOrder } from '../api';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cartItems, cartTotal, removeFromCart, clearCart, loading } = useCart();
    const { isAuthenticated, token } = useAuth();

    const [showModal, setShowModal] = React.useState(false);
    const [isProcessing, setIsProcessing] = React.useState(false);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            toast.error("Debes iniciar sesión para finalizar la compra.");
            return;
        }

        setIsProcessing(true);
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.product._id,
                    name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price
                })),
                total: cartTotal
            };

            await createOrder(orderData, token);
            setShowModal(true);
            clearCart(); // Limpiar carrito después de compra exitosa
        } catch (error) {
            console.error("Error al procesar la compra:", error);
            toast.error("Hubo un error al procesar tu pedido. Inténtalo de nuevo.");
        } finally {
            setIsProcessing(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // Estado para usuario no autenticado
    if (!isAuthenticated) {
        return (
            <div className="cart-empty-container">
                <h2>Inicia sesión para ver tu carrito</h2>
                <p>Tu carrito de compras te está esperando.</p>
                <Link to="/login" className="btn-return">Iniciar Sesión</Link>
            </div>
        );
    }
    
    // Estado de carga
    if (loading) {
        return <div className="cart-container"><p>Cargando tu carrito...</p></div>;
    }

    // Estado de carrito vacío
    if (!loading && cartItems.length === 0 && !showModal) {
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
                    {cartItems.map((item) => (
                        <div key={item.product._id} className="cart-item">
                            <img 
                                src={item.product.image || "https://placehold.co/100"} 
                                alt={item.product.name} 
                                className="cart-item-img"
                            />
                            <div className="cart-item-details">
                                <Link to={`/productos/${item.product._id}`}><h3>{item.product.name}</h3></Link>
                                <p className="cart-item-price">${item.product.price?.toLocaleString('es-AR')}</p>
                            </div>
                            
                            <div className="cart-item-actions">
                                <span className="quantity-label">Cant: {item.quantity}</span>
                                <button 
                                    onClick={() => removeFromCart(item.product._id)}
                                    className="btn-remove"
                                    aria-label="Eliminar producto"
                                >
                                    <FaTrashAlt />
                                </button>
                            </div>
                            
                            <div className="cart-item-subtotal">
                                <p>Subtotal:</p>
                                <strong>${(item.product.price * item.quantity).toLocaleString('es-AR')}</strong>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen de Compra */}
                <div className="cart-summary">
                    <h2>Resumen</h2>
                    <div className="summary-row">
                        <span>Total de productos:</span>
                        <span>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
                    </div>
                    <div className="summary-row total">
                        <span>Total a pagar:</span>
                        <span>${cartTotal.toLocaleString('es-AR')}</span>
                    </div>
                    
                    <button 
    onClick={handleCheckout} 
    className="btn-checkout" 
    disabled={isProcessing}
>
    {isProcessing ? 'Procesando...' : 'Finalizar Compra'}
</button>
                    <div className='cart-summary-actions'>
                      <Link to="/productos" className="link-continue">Seguir comprando</Link>
                      <button onClick={clearCart} className="btn-clear-cart">
                          Vaciar Carrito
                      </button>
                    </div>
                </div>
            </div>

            {/* Modal de Compra Finalizada */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-icon">🎉</div>
                        <h2>¡Compra Finalizada!</h2>
                        <p>Gracias por tu compra. Hemos procesado tu pedido correctamente.</p>
                        <button onClick={closeModal} className="btn-modal-close">
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
