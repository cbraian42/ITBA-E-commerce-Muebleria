import React from 'react';
import images from '../img';

const ProductCard = ({ product, onClick }) => {
  if (!product) {
    return null;
  }

  return (
    <div className="product-card" onClick={onClick}>
      <img
        src={images[product.image]}  
        alt={product.name}
      />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>${product.price?.toLocaleString()}</strong>
    </div>
  );
};

export default ProductCard;