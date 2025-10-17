import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <h1>Mueblería Jota</h1>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/productos">Catálogo</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
                <li><Link to="/crear-producto">Crear Producto</Link></li>
            </ul>
        </nav>
    )
}
