// app.js

async function cargarFragmento(selector, archivo) {
    try {
        const respuesta = await fetch(archivo);
        if (!respuesta.ok) {
            throw new Error(`Error al cargar ${archivo}: ${respuesta.status}`);
        }
        const contenido = await respuesta.text();
        document.querySelector(selector).innerHTML = contenido;
    } catch (error) {
        console.error("Error en cargarFragmento:", error);
    }
}

// Función para inicializar el menú de hamburguesa
function inicializarMenuHamburguesa() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
    } else {
        console.error('No se encontraron los elementos del menú de hamburguesa.');
    }
}

function marcarEnlaceActivo() {
    // Obtener el nombre del archivo actual (sin la barra inicial)
    let currentPage = window.location.pathname.split('/').pop();

    // Si estamos en la raíz, asumimos que es index.html
    if (currentPage === '' || currentPage === '/') {
        currentPage = 'index.html';
    }

    console.log('Página actual detectada:', currentPage); // DEBUG

    // Obtener todos los enlaces del nav
    const navLinks = document.querySelectorAll('nav a');
    console.log('Enlaces encontrados:', navLinks.length); // DEBUG

    // Remover todas las clases active
    navLinks.forEach(link => link.classList.remove('active'));

    // Agregar active al enlace correspondiente
    navLinks.forEach(link => {
        const href = link.getAttribute('href');

        // Obtener solo el nombre del archivo del href (sin ./ ni rutas)
        let hrefPage = href;
        if (href.startsWith('./')) {
            hrefPage = href.substring(2); // Quita "./"
        }

        console.log('Comparando:', hrefPage, 'con', currentPage); // DEBUG

        // Comparar con la página actual
        if (hrefPage === currentPage ||
            (href === './' && currentPage === 'index.html') ||
            (href === '' && currentPage === 'index.html')) {
            link.classList.add('active');
            console.log('✅ Marcado como activo:', href); // DEBUG
        }
    });
}

// Funcion que crea la variable de sesion para el contador del carrito
function contadorCarrito() {
    // Leer productos del localStorage
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Calcular total de cantidades
    let total = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    // Mostrar
    const contadorCarrito = document.getElementById("spanContadorCarrito");
    if (contadorCarrito) {
        contadorCarrito.innerText = total;
    }
}


// Cargar header y footer automáticamente
// Y luego inicializar todo
document.addEventListener('DOMContentLoaded', async () => {
    await cargarFragmento("#header", "partials/header.html");
    await cargarFragmento("#footer", "partials/footer.html");

    // Inicializar funcionalidades después de cargar el header
    inicializarMenuHamburguesa();
    marcarEnlaceActivo();
    contadorCarrito();
});


