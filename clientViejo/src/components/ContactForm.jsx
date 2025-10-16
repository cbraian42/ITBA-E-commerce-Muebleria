import React, { useState } from 'react';

const ContactForm = ({ onSubmit, onBack }) => {
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
    <div className="contact-box"> 
      
      <button onClick={onBack} className="btn-volver" style={{ marginBottom: '1rem' }}>
        ← Volver al catálogo
      </button>

      <form onSubmit={handleSubmit}>
        
        <h1>Contáctanos</h1> 
        
        
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <button
          type="submit"
          className="btn"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactForm;