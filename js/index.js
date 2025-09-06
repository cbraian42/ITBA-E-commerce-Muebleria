// Cargar productos aleatorios
async function cargarProductosAleatorios() {
  const response = await fetch('./data/productos.json');
  const productos = await response.json();
  
  // Tomar 4 productos aleatorios
  const productosAleatorios = productos
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  // Mostrar productos
  mostrarProductos(productosAleatorios);
}

// Crear HTML de los productos
function mostrarProductos(productos) {
  const container = document.getElementById('productos-container');
  
  container.innerHTML = productos.map(producto => `
    <article class="producto">
      <img src="${producto.image}" alt="${producto.name}" />
      <h3>${producto.name}</h3>
      <p>$${formatearPrecio(producto.price)}</p>
    </article>
  `).join('');
}

// Formatear precio
function formatearPrecio(precio) {
  return precio.toLocaleString('es-AR');
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
  cargarProductosAleatorios();
});