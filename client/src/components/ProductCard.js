function ProductCard({ producto }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{producto.name}</h3>
      <p>Precio: ${producto.price}</p>
    </div>
  );
}

export default ProductCard;
