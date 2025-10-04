import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2>Formulario de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Mensaje:</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="5"
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactForm;