import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { eliminarProducto } from '../api';
import './ProductDetail.css';

const ProductDetail = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Asignamos un valor de stock por defecto si no viene en el producto
  const stock = product.stock ?? 10;

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleDeleteProduct = async () => {
    const response = window.confirm(`¿Confirmar eliminación del producto '${product.name}'?`);
    if (response) {
      try {
        const data = await eliminarProducto(product._id);
        console.log('Producto eliminado:', data);
        alert('Producto eliminado con exito');

        alert('Redirigiendo al catalogo...')
        navigate("/productos");

      } catch (error) {
        console.error(error);
        console.log(product);
        alert('No fue posible eliminar el producto');
      }
    }

  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= stock) {
      setQuantity(newQuantity);
    }
  };

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/productos')} className="btn-primary">
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
        <div className="product-detail-image">
          <img
            src={product.image || "https://placehold.co/600x400?text=N/A"}
            alt={product.name}
          />
          {stock === 0 && (
            <span className="stock-badge agotado">Agotado</span>
          )}
          {stock > 0 && stock <= 3 && (
            <span className="stock-badge bajo">¡Últimas unidades!</span>
          )}
        </div>

        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">
            ${product.price?.toLocaleString('es-AR')}
          </p>
          <p className="product-detail-description">
            {product.description}
          </p>

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
                disabled={quantity >= stock}
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>
            <span className="stock-info">
              {stock > 0
                ? `${stock} disponibles`
                : 'Sin stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-add-cart-detail"
            disabled={stock === 0 || addedToCart}
          >
            {addedToCart ? '✓ Agregado al carrito' : 'Agregar al carrito'}
          </button>
          <button type='button' className='btn-delete-product' onClick={handleDeleteProduct} >ELIMINAR </button>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
