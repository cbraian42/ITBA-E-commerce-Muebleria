import React from 'react';
import images from '../img';

const ProductDetail = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="detallemain"> 
      
      <button 
        onClick={onBack} 
        className="btn-volver" 
        style={{ marginBottom: '1rem' }}
      >
        ← Volver al catálogo
      </button>

      <div className="producto-detalle"> 
        
        <div className="producto-imagen"> 
          <img
            src={images[product.image]}
            alt={product.name}
          />
        </div>

        <div className="producto-info">
          
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <h3>Precio: ${product.price?.toLocaleString()}</h3>
          
          <table id="tabla-caracteristicas">
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
            className="btn" 
            style={{ width: 'fit-content', marginTop: '1rem' }}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;