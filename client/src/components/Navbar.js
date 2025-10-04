import React from 'react';

const Navbar = ({ cartCount, onContactClick }) => {
  return (
    <nav className="navbar">
      <h1>Mueblería Hermanos Jota</h1>
      <div>
        <button className="btn btn-secondary" onClick={onContactClick}>
          Contacto
        </button>
        <span style={{ marginLeft: '1rem' }}>🛒 Carrito ({cartCount})</span>
      </div>
    </nav>
  );
};

export default Navbar;