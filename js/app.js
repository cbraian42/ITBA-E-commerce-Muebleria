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
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            nav.classList.toggle('active');
        });
    } else {
        console.error('No se encontraron los elementos del menú de hamburguesa.');
    }
}

// Cargar header y footer automáticamente
// Y luego inicializar el menú
document.addEventListener('DOMContentLoaded', async () => {
    await cargarFragmento("#header", "partials/header.html");
    await cargarFragmento("#footer", "partials/footer.html");
    
    inicializarMenuHamburguesa();
});