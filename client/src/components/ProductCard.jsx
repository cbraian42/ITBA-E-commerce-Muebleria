import React from 'react';
import images from '../img';

const ProductCard = ({ product, onClick, onAddToCart }) => {
  if (!product) {
    return null;
  }

  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    onAddToCart(product);
  };

  return (
    <div className="tarjeta" onClick={onClick}>
      <img
        src={images[product.image]}  
        alt={product.name}
      />
      
      <div className="info">
        <h2>{product.name}</h2> 
        <p className="precio">${product.price?.toLocaleString()}</p>
        <button 
          className="producto-agregar"
          onClick={handleAddToCart}
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;