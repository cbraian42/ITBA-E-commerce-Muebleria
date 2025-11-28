import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import './ContactForm.css'; //Usamos el mismo estilo que en contacto.

function Login() {
    const { login } = useContext(AuthContext);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            login(data.token); //se guarda el jwt, que tendria q tener la info del usuario logueado
            console.log('Login exitoso');


        } catch (error) {
            alert(`Error en el login: ${error.message}`);
        }
    };
return (
  <div className="contact-page">
    <div className="contact-box">
      <form className="contact-form">
        <h1>Inicio de sesión</h1>

        <div className="form-group">
          <label>Usuario:</label>
          <input
            type="text"
            placeholder="Tu usuario"
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Tu contraseña"
            className="input-field"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Iniciar sesión
        </button>
      </form>
    </div>
  </div>
)
}

export default Login
