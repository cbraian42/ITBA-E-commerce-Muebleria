import React from 'react';

const ProductDetail = ({ product, onBack, onAddToCart }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '1rem' }}>
        ← Volver al catálogo
      </button>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <img
          src={product.imagen || 'https://via.placeholder.com/400?text=Producto'}
          alt={product.nombre}
          style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <div>
          <h2>{product.nombre}</h2>
          <p>{product.descripcion}</p>
          <h3>Precio: ${product.precio}</h3>
          <p><strong>Material:</strong> {product.material}</p>
          <p><strong>Disponible:</strong> {product.disponible ? 'Sí' : 'No'}</p>
          <button
            onClick={() => onAddToCart(product)}
            style={{
              marginTop: '1rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;