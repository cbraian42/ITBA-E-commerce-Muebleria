import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductos } from '../api';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default function Home() {
    const [destacados, setDestacados] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const productos = await getProductos();
                // Como no hay un flag "destacado", seleccionamos los primeros 4
                setDestacados(productos.slice(0, 4));
            } catch (error) {
                console.error("Error al cargar productos destacados:", error);
            }
        };

        cargarProductos();
    }, []); // El array vacío asegura que se ejecute solo una vez

    const handleProductClick = (product) => {
        navigate(`/productos/${product._id}`);
    };

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
                    {destacados.length > 0 ? (
                        <img
                            src={destacados[2].image}
                            alt={destacados[2].name}
                        />
                    ) : (
                        <div className="hero-imagen-placeholder" />
                    )}
                </div>
            </section>

            {/* Productos Destacados */}
            <section className="productosDestacados">
                <h2>Productos Destacados</h2>
                <div className="productos">
                    {destacados.length > 0 ? (
                        destacados.map(producto => (
                            <ProductCard
                                key={producto._id}
                                product={producto}
                                onClick={handleProductClick}
                            />
                        ))
                    ) : (
                        <p>Cargando productos...</p>
                    )}
                </div>
            </section>
        </main>
    );
}