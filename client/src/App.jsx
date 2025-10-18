import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Contact from './pages/ContactForm'
import ProductDetail from './pages/ProductDetail'
import AdminCreateProduct from './pages/CreateProduct'
import Footer from './components/Footer'

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Catalog />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin/crear-producto" element={<AdminCreateProduct />} />
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App
