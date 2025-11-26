const API_URL = import.meta.env.VITE_API_URL;


// Obtener todos los productos
// ruta sin seguridad
export async function getProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
}

// Obtener un producto por ID
// ruta sin seguridad
export async function getProducto(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`);
  if (!res.ok) throw new Error('Error al obtener el producto');
  return await res.json();
}

// Crear un nuevo producto
// ruta con seguridad
export async function crearProducto(data, token) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('No fue posible crear el producto');
  return await res.json();
}
// ruta con seguridad
export async function eliminarProducto(id, token) {
  const res = await fetch(`${API_URL}/api/productos/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (!res.ok) throw new Error('No fue posible eliminar el producto');

  return await res.json();
}
