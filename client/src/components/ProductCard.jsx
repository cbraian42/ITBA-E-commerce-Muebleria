import React, { useContext } from 'react';
import './ProductCard.css';
import { AuthContext } from '../auth/AuthContext';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  //console.log('ProductCard received:', product?.name, product?.image);
  if (!product) {
    return null;
  }
  const { isAuthenticated } = useContext(AuthContext);


  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
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
          src={product.image || "https://placehold.co/600x400?text=N/A"}
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

          {isAuthenticated && ( //si no esta logueado, no se muestra el boton de agregar
            <button
              className="btn-add-cart"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              aria-label={`Agregar ${product.name} al carrito`}
            >
              {product.stock === 0 ? 'Sin stock' : 'Agregar'}
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;