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

// Cargar header y footer automáticamente
cargarFragmento("#header", "partials/header.html");
cargarFragmento("#footer", "partials/footer.html");
