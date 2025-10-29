import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  if (!product) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handleKeyDown = (e) => {
    // Accesibilidad: Enter o Space activan el click
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <article 
      className="product-card"
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${product.name}`}
    >
      <div className="product-card-image">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        {product.stock === 0 && (
          <span className="product-card-badge">Agotado</span>
        )}
        {product.nuevo && (
          <span className="product-card-badge badge-nuevo">Nuevo</span>
        )}
      </div>
      
      <div className="product-card-info">
        <h3 className="product-card-title">{product.name}</h3>
        
        {product.description && (
          <p className="product-card-description">
            {product.description.length > 80 
              ? `${product.description.substring(0, 80)}...` 
              : product.description
            }
          </p>
        )}
        
        <div className="product-card-footer">
          <p className="product-card-price">
            ${product.price?.toLocaleString('es-AR')}
          </p>
          
          <button 
            className="btn-add-cart"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {product.stock === 0 ? 'Sin stock' : 'Agregar'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;