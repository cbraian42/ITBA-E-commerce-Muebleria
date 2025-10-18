import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProducto } from '../api';
import ProductDetailComponent from '../components/ProductDetail';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProducto(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (productWithQuantity) => {
    // Lógica para agregar al carrito (ej. context, localStorage, etc.)
    console.log('Producto agregado:', productWithQuantity);
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-error">
        <h2>Error al cargar el producto</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-error">
        <h2>Producto no encontrado</h2>
      </div>
    );
  }

  return <ProductDetailComponent product={product} onAddToCart={handleAddToCart} />;
}