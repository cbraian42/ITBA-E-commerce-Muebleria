import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

export default function Navbar() {
    const { cartCount } = useCart()
    const [menuAbierto, setMenuAbierto] = useState(false)

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto)
    }

    const cerrarMenu = () => {
        setMenuAbierto(false)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h1 className="navbar-logo">Mueblería Jota</h1>

                {/* Botón hamburguesa */}
                <button
                    className={`hamburger ${menuAbierto ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Menú"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Menú de navegación */}
                <ul className={`navbar-menu ${menuAbierto ? 'active' : ''}`}>
                    <li><Link to="/" onClick={cerrarMenu}>Inicio</Link></li>
                    <li><Link to="/productos" onClick={cerrarMenu}>Catálogo</Link></li>
                    <li><Link to="/contacto" onClick={cerrarMenu}>Contacto</Link></li>
                    <li><Link to="/admin/crear-producto" onClick={cerrarMenu}>Crear Producto</Link></li>
                    <li className="navbar-cart">
                        <Link to="/carrito" onClick={cerrarMenu}>
                            🛒
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>
                    </li>
                </ul>

                {/* Icono de carrito fuera del menú hamburguesa para vista desktop */}
                <div className="navbar-cart-desktop">
                    <Link to="/carrito">
                        🛒
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    )
}