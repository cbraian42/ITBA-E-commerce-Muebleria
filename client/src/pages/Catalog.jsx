import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductos } from '../api';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const Catalog = () => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await getProductos();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('No se pudieron cargar los productos. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/productos/${product.id}`);
  };

  const handleAddToCart = (product) => {
    console.log('Added to cart from catalog:', product);
  };

  return (
    <div className="catalogo-page">
      <div className="catalogo-header">
        <h1>Nuestro Catálogo</h1>
        <p>Descubrí nuestra colección de muebles artesanales</p>
      </div>

      {loading && (
        <div className="catalogo-loading">
          <div className="spinner"></div>
          <p>Cargando productos...</p>
        </div>
      )}

      {error && (
        <div className="catalogo-error">
          <p>{error}</p>
          <button onClick={loadProducts} className="btn-retry">
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="catalogo-vacio">
              <p>No se encontraron productos.</p>
            </div>
          ) : (
            <div className="productos-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalog;
