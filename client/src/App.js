import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ContactForm from './components/ContactForm';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    fetch('http://localhost:4000/api/productos')
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar los productos');
        return res.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const handleBackToList = () => {
    setSelectedProduct(null);
  };

  const handleShowContact = () => {
    setShowContact(true);
  };

  const handleContactSubmit = (formData) => {
    console.log('Formulario enviado:', formData);
    alert('¡Gracias por tu mensaje! Pronto nos pondremos en contacto.');
    setShowContact(false);
  };

  return (
    
    <div className="App">
      <Navbar cartCount={cart.length} onContactClick={handleShowContact} />

      <main style={{ padding: '20px', minHeight: '70vh' }}>
        {showContact ? (
          <ContactForm onSubmit={handleContactSubmit} />
        ) : selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackToList}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onProductClick={handleProductClick}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;