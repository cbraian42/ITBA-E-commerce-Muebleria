import React, { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import './ContactForm.css'; // Reutilizamos el estilo de ContactForm/Login

export default function Register() {
    const { login } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Registro
            const res = await fetch("http://localhost:4000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setMessage(data.message || "Error al registrarse");
                return;
            }

            setMessage(data.message);

            // Auto-login
            const loginRes = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const loginData = await loginRes.json();
            if (loginRes.ok) {
                login(loginData.token);
            }

        } catch (error) {
            console.error(error);
            setMessage("Error en la conexión con el servidor");
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-box">
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h1>Registro</h1>

                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="input-field"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Tu email"
                            className="input-field"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            placeholder="Tu contraseña"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Registrarse
                    </button>

                    {message && <p style={{ marginTop: "10px", textAlign: "center" }}>{message}</p>}
                </form>
            </div>
        </div>
    );
}
