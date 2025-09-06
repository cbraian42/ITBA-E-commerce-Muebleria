document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  try {
    const response = await fetch("../data/productos.json");
    const productos = await response.json();

    const producto = productos.find(item => item.id === idProducto);

    if (!producto) return;

    // Rellenar HTML
    document.getElementById("producto-nombre").textContent = producto.name;
    document.getElementById("producto-precio").textContent = `$ ${producto.price}`;
    document.getElementById("producto-descripcion").textContent = producto.description || "Sin descripción disponible";
    document.getElementById("producto-imagen").src = producto.image;
    document.getElementById("producto-imagen").alt = `Imagen de ${producto.name}`;

    // Evento del botón
    document.getElementById("agregar-carrito").addEventListener("click", () => {
      agregarAlCarrito(producto);
    });

  } catch (error) {
    console.error("Error al cargar el producto:", error);
  }
});

// 🔥 Función para añadir al carrito
function agregarAlCarrito(producto) {
  // 1. Recuperar el carrito actual o crear uno vacío
  let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

  // 2. Buscar si ya existe en el carrito
  const index = productosEnCarrito.findIndex(item => item.id === producto.id);

  if (index !== -1) {
    // Ya existe → aumentar cantidad
    productosEnCarrito[index].cantidad++;
  } else {
    // No existe → clonamos el producto y le agregamos cantidad
    const nuevoProducto = { ...producto, cantidad: 1 };
    productosEnCarrito.push(nuevoProducto);
  }

  // 3. Guardar el carrito actualizado en localStorage
  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

  // 4. Actualizar numerito del carrito
  actualizarContador();
}

// 🔄 Actualiza el numerito en el header
function actualizarContador() {
  let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
  const total = productosEnCarrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById("spanContadorCarrito").innerText = total;
}
