
import React from 'react';

const ProductCard = ({ product, onClick }) => {
  // Protección: si product es undefined o null, no renderizar
  if (!product) {
    return null;
  }

  return (
    <div className="product-card" onClick={onClick}>
      <img
        src={`/${product.imagen}`}  
        alt={product.nombre || 'Producto'}
      />
      <h3>{product.nombre}</h3>
      <p>{product.descripcion}</p>
      <strong>${product.precio?.toLocaleString() || 'N/A'}</strong>
    </div>
  );
};

export default ProductCard;