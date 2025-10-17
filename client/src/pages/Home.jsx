import { Link } from 'react-router-dom'
import './Home.css'
import camaNeuquen from '../assets/images/Cama-Neuquen.png'

export default function Home() {
    return (
        <main>
            {/* Hero Banner */}
            <section className="hero">
                <div className="hero-texto">
                    <h1>Muebles con tradición y estilo</h1>
                    <p>Más de 30 años creando piezas únicas en madera de autor.</p>
                    <Link to="/productos" className="btn">Ver Catálogo</Link>
                </div>
                <div className="hero-imagen">
                    <img
                        src={camaNeuquen}
                        alt="Cama Neuquén de diseño artesanal en madera"
                    />
                </div>
            </section>

            {/* Productos Destacados */}
            <section className="productosDestacados">
                <h2>Productos Destacados</h2>
                <div className="productos" id="productos-container"></div>
            </section>
        </main>
    )
}