import React from 'react';
import images from '../img';

const ProductCard = ({ product, onClick }) => {
  // Protección: si product es undefined o null, no renderizar
  if (!product) {
    return null;
  }

  return (
    <div className="product-card" onClick={onClick}>
      {console.log(product)}
      <img
        src={images[product.image]}  
        alt={product.name || 'Producto'}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price?.toLocaleString() || 'N/A'}</strong>
    </div>
  );
};

export default ProductCard;