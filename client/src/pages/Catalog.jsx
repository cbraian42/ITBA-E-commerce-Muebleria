import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const Catalogo = ({ onAddToCart }) => {
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('todos'); // Para filtros opcionales

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Aquí iría tu lógica de carga (API, import, etc.)
      // Simulación:
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Ejemplo de productos (reemplazar con tu data real)
      const mockProducts = [
        {
          id: 1,
          nombre: 'Mesa Comedor Roble',
          precio: 125000,
          imagen: '/images/mesa1.jpg',
          categoria: 'mesas'
        },
        {
          id: 2,
          nombre: 'Silla Vintage',
          precio: 35000,
          imagen: '/images/silla1.jpg',
          categoria: 'sillas'
        },
        // ... más productos
      ];
      
      setProducts(mockProducts);
      setLoading(false);
      
    } catch (err) {
      setError('No se pudieron cargar los productos. Intenta nuevamente.');
      setLoading(false);
    }
  };

  const handleProductClick = (product) => {
    navigate(`/producto/${product.id}`);
  };

  const filteredProducts = filter === 'todos' 
    ? products 
    : products.filter(p => p.categoria === filter);

  return (
    <div className="catalogo-page">
      <div className="catalogo-header">
        <h1>Nuestro Catálogo</h1>
        <p>Descubrí nuestra colección de muebles artesanales</p>
      </div>

      {/* Filtros opcionales */}
      <div className="catalogo-filtros">
        <button 
          className={`btn-filtro ${filter === 'todos' ? 'active' : ''}`}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
        <button 
          className={`btn-filtro ${filter === 'mesas' ? 'active' : ''}`}
          onClick={() => setFilter('mesas')}
        >
          Mesas
        </button>
        <button 
          className={`btn-filtro ${filter === 'sillas' ? 'active' : ''}`}
          onClick={() => setFilter('sillas')}
        >
          Sillas
        </button>
        <button 
          className={`btn-filtro ${filter === 'escritorios' ? 'active' : ''}`}
          onClick={() => setFilter('escritorios')}
        >
          Escritorios
        </button>
      </div>

      {/* Estados de carga/error */}
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

      {/* Grid de productos */}
      {!loading && !error && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="catalogo-vacio">
              <p>No se encontraron productos en esta categoría.</p>
            </div>
          ) : (
            <div className="productos-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => handleProductClick(product)}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Catalogo;