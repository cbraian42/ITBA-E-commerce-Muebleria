import React, { useContext, useState } from 'react';
import { AuthContext } from '../auth/AuthContext';
import './ContactForm.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [message, setMessage] = useState(''); 
  const [isSuccess, setIsSuccess] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    setIsSuccess(false); 

    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setMessage(data.message || "Error desconocido. Inténtalo de nuevo.");
        throw new Error(data.message); 
      }
      
      login(data.token);
      setMessage("Login exitoso");
      setIsSuccess(true); 
      setTimeout(() => {
        navigate("/perfil");
      }, 500); 

    } catch (error) {
      console.error('Error durante el login:', error.message);
      if(!message) setMessage("Error de conexión con la API."); 
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-box">
        <form className="contact-form" onSubmit={handleSubmit}>
          <h1>Inicio de sesión</h1>
          
          {message && (
            <p 
              style={{ 
                marginTop: "10px", 
                textAlign: "center", 
                color: isSuccess ? 'green' : 'red' 
              }}
            >
              {message}
            </p>
          )}

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Tu email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              placeholder="Tu contraseña"
              className="input-field" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;