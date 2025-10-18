import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import images from '../assets/images';
import './ProductDetail.css';

const ProductDetail = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Asignamos un valor de stock por defecto si no viene en el producto
  const stock = product.stock ?? 10;

  const handleAddToCart = () => {
    if (onAddToCart && product) {
      onAddToCart({ ...product, quantity });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/productos')} className="btn-primary">
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <button 
        onClick={() => navigate(-1)} 
        className="btn-volver"
        type="button"
      >
        ← Volver
      </button>

      <div className="product-detail-container">
        <div className="product-detail-image">
          <img 
            src={images[product.image]} 
            alt={product.name}
          />
          {stock === 0 && (
            <span className="stock-badge agotado">Agotado</span>
          )}
          {stock > 0 && stock <= 3 && (
            <span className="stock-badge bajo">¡Últimas unidades!</span>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">
            ${product.price?.toLocaleString('es-AR')}
          </p>
          <p className="product-detail-description">
            {product.description}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="product-detail-features">
              <h3>Características</h3>
              <table className="features-table">
                <tbody>
                  {product.features.map((feature, index) => (
                    <tr key={index}>
                      <th>{feature.name}</th>
                      <td>{feature.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="product-detail-quantity">
            <label htmlFor="quantity">Cantidad:</label>
            <div className="quantity-selector">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <input 
                type="number" 
                id="quantity"
                value={quantity} 
                readOnly
                aria-label="Cantidad seleccionada"
              />
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= stock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <span className="stock-info">
              {stock > 0 
                ? `${stock} disponibles` 
                : 'Sin stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-add-cart-detail"
            disabled={stock === 0 || addedToCart}
          >
            {addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
