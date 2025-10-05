
import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error, onProductClick }) => {
  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  
  if (!Array.isArray(products) || products.length === 0) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
      gap: '2rem',
      padding: '2rem'
    }}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
};

export default ProductList;