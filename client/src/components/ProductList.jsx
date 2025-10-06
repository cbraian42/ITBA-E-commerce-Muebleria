import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error, onProductClick, onAddToCart }) => {
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <div className="productos-tarjeta"> 
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;