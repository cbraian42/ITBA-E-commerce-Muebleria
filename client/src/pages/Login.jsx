import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';

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
        <div>
            <h1>Inicio de sesion</h1>
            <form>
                <div>
                    <label>Usuario:</label>
                    <input></input>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input></input>
                </div>
            </form>
        </div>
    )
}

export default Login
