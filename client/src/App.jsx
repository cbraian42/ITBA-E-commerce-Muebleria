import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Cart from './pages/Carts' 
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Contact from './pages/ContactForm'
import ProductDetail from './pages/ProductDetail'
import AdminCreateProduct from './pages/CreateProduct'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'
import { AuthContext } from './auth/AuthContext'
import Perfil from './pages/Perfil'


function App() {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);

  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<Catalog />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        
        {/* Nueva ruta del carrito */}
        <Route path="/carrito" element={<Cart />} /> 

        {isAuthenticated && (  
          <>
            <Route path="/perfil" element={<Perfil />} />
            {isAdmin && ( 
              <Route path="/admin/crear-producto" element={<AdminCreateProduct />} />
            )}
          </>)
        }
      </Routes>
      <Footer />
    </CartProvider>
  )
}

export default App
