import React from 'react';
import images from '../img';

const ProductDetail = ({ product, onBack, onAddToCart }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={onBack} style={{ marginBottom: '1rem' }}>
        ← Volver al catálogo
      </button>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <img
          src={images[product.image]}
          alt={product.name}
          style={{ width: '400px', height: '400px', objectFit: 'cover', borderRadius: '8px' }}
        />
        <div>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>Precio: ${product.price?.toLocaleString()}</h3>
          <table>
            <thead>
              <tr>
                {product.features.map((feature, index) => (
                  <th key={index}>{feature.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {product.features.map((feature, index) => (
                  <td key={index}>{feature.value}</td>
                ))}
              </tr>
            </tbody>
          </table>
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