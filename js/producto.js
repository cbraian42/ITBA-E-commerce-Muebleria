// Espera a que cargue todo el contenido del DOM
document.addEventListener("DOMContentLoaded", async () => {
  // 1. Obtener el parámetro "id" de la URL (ej: detalleProducto.html?id=1)
  const params = new URLSearchParams(window.location.search);
  const idProducto = params.get("id");

  if (!idProducto) {
    console.error("No se encontró un id de producto en la URL");
    return;
  }

  try {
    // 2. Cargar el archivo productos.json
    const response = await fetch("../data/productos.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar el archivo productos.json");
    }

    const productos = await response.json();

    // 3. Buscar el producto con el id correspondiente
    const producto = productos.find(item => item.id === idProducto);

    if (!producto) {
      console.error("Producto no encontrado");
      return;
    }

    // 4. Completar el HTML con los datos del producto
    document.getElementById("producto-nombre").textContent = producto.name;
    document.getElementById("producto-precio").textContent = `$ ${producto.price}`;
    document.getElementById("producto-descripcion").textContent =
      producto.description || "Sin descripción disponible";
    document.getElementById("producto-imagen").src = producto.image;
    document.getElementById("producto-imagen").alt = `Imagen de ${producto.name}`;

    // 5. Evento del botón "Añadir al carrito"
    document.getElementById("agregar-carrito").addEventListener("click", () => {
      // Aquí puedes guardar el producto en localStorage o en una variable global de carrito
      alert(`${producto.name} añadido al carrito`);
    });

  } catch (error) {
    console.error("Error al cargar el producto:", error);
  }
});
