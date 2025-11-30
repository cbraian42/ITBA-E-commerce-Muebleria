import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useCart } from '../context/CartContext';
import './Navbar.css';
import { AuthContext } from '../auth/AuthContext';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
    const { isAuthenticated, user, logout, isAdmin } = useContext(AuthContext);
    const { cartCount } = useCart();
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => setMenuAbierto(!menuAbierto);
    const cerrarMenu = () => setMenuAbierto(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo-link" onClick={cerrarMenu}>
                    <h1 className="navbar-logo">Mueblería Jota</h1>
                </Link>

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

                    {isAuthenticated ? (
                        <>
                            <li><Link to="/perfil" onClick={cerrarMenu}>Perfil</Link></li>
                            {isAdmin && (
                                <li><Link to="/admin/crear-producto" onClick={cerrarMenu}>Crear Producto</Link></li>
                            )}
                            <li>
                                <button onClick={logout} className="btn-logout">Cerrar sesión</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" onClick={cerrarMenu}>Iniciar sesión</Link></li>
                            <li><Link to="/register" onClick={cerrarMenu}>Registrarse</Link></li>
                        </>
                    )}

                    <li className="navbar-cart">
                        <Link to="/carrito" onClick={cerrarMenu}>
                            <FaShoppingCart className="cart-icon" />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>
                    </li>
                </ul>

                {/* Icono de carrito para vista desktop */}
                <div className="navbar-cart-desktop">
                    <Link to="/carrito">
                        <FaShoppingCart className="cart-icon" />
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
}
