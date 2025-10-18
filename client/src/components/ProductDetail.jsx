import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import images from '../img';
import './ProductDetail.css';

const ProductDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      
      // Aquí iría tu lógica de carga (API, contexto, etc.)
      // Simulación:
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock product - reemplazar con tu data real
      const mockProduct = {
        id: parseInt(id),
        name: 'Mesa Comedor Roble Macizo',
        price: 125000,
        image: 'mesa1',
        description: 'Elegante mesa de comedor fabricada en roble macizo de primera calidad. Cada pieza es única, tallada a mano por artesanos con más de 30 años de experiencia. Acabado natural con barniz ecológico que resalta las vetas naturales de la madera.',
        stock: 8,
        features: [
          { name: 'Material', value: 'Roble Macizo' },
          { name: 'Dimensiones', value: '180x90x75 cm' },
          { name: 'Acabado', value: 'Barniz Natural' },
          { name: 'Garantía', value: '10 años' }
        ],
        categoria: 'mesas'
      };
      
      setProduct(mockProduct);
      setLoading(false);
      
    } catch (error) {
      console.error('Error cargando producto:', error);
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart && product) {
      onAddToCart({ ...product, quantity });
      setAddedToCart(true);
      
      // Reset feedback después de 2 segundos
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/catalogo')} className="btn-primary">
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      
      <button 
        onClick={() => navigate(-1)} 
        className="btn-volver"
        type="button"
      >
        ← Volver
      </button>

      <div className="product-detail-container">
        
        {/* Imagen */}
        <div className="product-detail-image">
          <img 
            src={images[product.image]} 
            alt={product.name}
          />
          {product.stock === 0 && (
            <span className="stock-badge agotado">Agotado</span>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <span className="stock-badge bajo">¡Últimas unidades!</span>
          )}
        </div>

        {/* Info */}
        <div className="product-detail-info">
          
          <h1 className="product-detail-title">{product.name}</h1>
          
          <p className="product-detail-price">
            ${product.price?.toLocaleString('es-AR')}
          </p>

          <p className="product-detail-description">
            {product.description}
          </p>

          {/* Características */}
          {product.features && product.features.length > 0 && (
            <div className="product-detail-features">
              <h3>Características</h3>
              <table className="features-table">
                <tbody>
                  {product.features.map((feature, index) => (
                    <tr key={index}>
                      <th>{feature.name}</th>
                      <td>{feature.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Selector de cantidad */}
          <div className="product-detail-quantity">
            <label htmlFor="quantity">Cantidad:</label>
            <div className="quantity-selector">
              <button 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                aria-label="Disminuir cantidad"
              >
                −
              </button>
              <input 
                type="number" 
                id="quantity"
                value={quantity} 
                readOnly
                aria-label="Cantidad seleccionada"
              />
              <button 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <span className="stock-info">
              {product.stock > 0 
                ? `${product.stock} disponibles` 
                : 'Sin stock'}
            </span>
          </div>

          {/* Botón agregar */}
          <button
            onClick={handleAddToCart}
            className="btn-add-cart-detail"
            disabled={product.stock === 0 || addedToCart}
          >
            {addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;