import React from 'react'

function Register() {

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/users/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const data = await response.json();
            alert(`Usuario '${data.username}' registrado correctamente`);

        } catch (error) {
            alert(`Error en el registro: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>REGISTRO</h1>
            <form>
                <div>
                    <label>Usuario:</label>
                    <input></input>
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input></input>
                </div>
                <div>
                    <label>Repita la contraseña:</label>
                    <input></input>
                </div>
            </form>
        </div>
    )
}

export default Register
