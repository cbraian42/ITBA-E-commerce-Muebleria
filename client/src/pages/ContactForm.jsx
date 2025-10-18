import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactForm.css';

const ContactForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      // Aquí iría tu lógica de envío (API, emailJS, etc.)
      // Simulación:
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Formulario enviado:', formData);
      
      setStatus({ loading: false, success: true, error: null });
      setFormData({ nombre: '', email: '', mensaje: '' });
      
      // Redirigir después de 2 segundos
      setTimeout(() => navigate('/'), 2000);
      
    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: 'Hubo un error al enviar el formulario. Intenta nuevamente.' 
      });
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-box">
        
        <form onSubmit={handleSubmit} className="contact-form">
          
          <h1>Contáctanos</h1>
          
          {status.success && (
            <div className="alert alert-success">
              ¡Mensaje enviado con éxito! Redirigiendo...
            </div>
          )}
          
          {status.error && (
            <div className="alert alert-error">
              {status.error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              minLength="3"
              placeholder="Juan Pérez"
              disabled={status.loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="juan@ejemplo.com"
              disabled={status.loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              minLength="10"
              rows="5"
              placeholder="Escribe tu consulta aquí..."
              disabled={status.loading}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status.loading}
          >
            {status.loading ? 'Enviando...' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;