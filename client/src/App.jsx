import { Routes, Route } from 'react-router-dom'

import './assets/styles/global.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Contact from './pages/Contact'
import ProductDetail from './pages/ProductDetail'
import AdminCreateProduct from './pages/CreateProduct'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Catalog />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/admin/crear-producto" element={<AdminCreateProduct />} />
      </Routes>
    </>
  )
}

export default App
