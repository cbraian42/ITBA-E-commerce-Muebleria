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

// --- API del Carrito ---

// Obtener el carrito del usuario
export async function getCart(token) {
  const res = await fetch(`${API_URL}/api/cart`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al obtener el carrito');
  return await res.json();
}

// Agregar o actualizar un item en el carrito
export async function addItemToCart(productId, quantity, token) {
  const res = await fetch(`${API_URL}/api/cart/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  if (!res.ok) throw new Error('Error al agregar el item al carrito');
  return await res.json();
}

// Eliminar un item del carrito
export async function removeItemFromCart(productId, token) {
  const res = await fetch(`${API_URL}/api/cart/items/${productId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al eliminar el item del carrito');
  return await res.json();
}

// Limpiar el carrito
export async function clearCartAPI(token) {
  const res = await fetch(`${API_URL}/api/cart`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Error al limpiar el carrito');
  return await res.json();
}

// Crear un pedido
export async function createOrder(orderData, token) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error('Error al crear el pedido');
  return await res.json();
}
