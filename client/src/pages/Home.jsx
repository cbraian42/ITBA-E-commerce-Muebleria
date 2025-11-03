import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProductos } from '../api';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton'; // Importar el esqueleto
import './Home.css';

export default function Home() {
    const [destacados, setDestacados] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const navigate = useNavigate();

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                setLoading(true);
                const productos = await getProductos();
                setDestacados(productos.slice(0, 4));
            } catch (error) {
                console.error("Error al cargar productos destacados:", error);
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, []);

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
                            src={destacados[3].image}
                            alt={destacados[3].name}
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
                    {loading ? (
                        // Mostrar 4 esqueletos mientras carga
                        [...Array(4)].map((_, index) => <ProductCardSkeleton key={index} />)
                    ) : (
                        destacados.map(producto => (
                            <ProductCard 
                                key={producto._id} 
                                product={producto}
                                onClick={handleProductClick}
                            />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}