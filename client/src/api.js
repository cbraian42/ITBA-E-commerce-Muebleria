const API_URL = import.meta.env.VITE_API_URL;

// Obtener todos los productos
export async function getProductos() {
  const res = await fetch(`${API_URL}/api/productos`);
  if (!res.ok) throw new Error('Error al obtener productos');
  return await res.json();
}

// Obtener un producto por ID
export async function getProducto(id) {
  const res = await fetch(`${API_URL}/api/productos/${id}`);
  if (!res.ok) throw new Error('Error al obtener el producto');
  return await res.json();
}

// Crear un nuevo producto
export async function crearProducto(data) {
  const res = await fetch(`${API_URL}/api/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('No fue posible crear el producto');
  return await res.json();
}
