# ITBA E-commerce Mueblería

Proyecto fullstack de una tienda de muebles online desarrollado como parte de la cursada.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura cliente-servidor:

-   **Backend**: Una API RESTful desarrollada con Node.js y Express. Se encarga de toda la lógica de negocio, la gestión de productos y la interacción con la base de datos.
    https://itba-e-commerce-muebleria.onrender.com/
-   **Frontend**: Una Single Page Application (SPA) desarrollada con React y Vite. Consume la API del backend para mostrar los productos, gestionar el carrito de compras y permitir a los usuarios navegar por el sitio.
    https://muebleria-hermanosjota-git-main-cbraian42s-projects.vercel.app/

## Tecnologías Utilizadas

### Backend

-   **Node.js**: Entorno de ejecución para JavaScript del lado del servidor.
-   **Express**: Framework para construir la API RESTful.
-   **MongoDB**: Base de datos NoSQL para almacenar los datos de los productos.
-   **Mongoose**: ODM para modelar los objetos de la aplicación y conectarse a MongoDB.
-   **CORS**: Middleware para habilitar el Cross-Origin Resource Sharing.
-   **Dotenv**: Para gestionar las variables de entorno.

### Frontend

-   **React**: Biblioteca para construir interfaces de usuario.
-   **Vite**: Herramienta de compilación y servidor de desarrollo rápido para proyectos de frontend.
-   **React Router DOM**: Para gestionar las rutas de la aplicación.
-   **CSS**: Para el diseño y la maquetación de la aplicación.

## Integrantes

-   Castro Braian
-   Almarcha Augusto
-   Badino Ian
-   Benjamin Benitez
-   Sequeria Osvaldo

## Instrucciones de Instalación y Uso

### Backend

1.  Navegar al directorio `backend`:
    ```bash
    cd backend
    ```
2.  Instalar las dependencias:
    ```bash
    npm install
    ```
3.  Crear un archivo `.env` a partir del `.env.template` y configurar las variables de entorno (como la URI de la base de datos de MongoDB).
4.  Ejecutar el servidor en modo de desarrollo:
    ```bash
    npm run dev
    ```
    El servidor se iniciará en el puerto configurado.

### Frontend

1.  En una nueva terminal, navegar al directorio `client`:
    ```bash
    cd client
    ```
2.  Instalar las dependencias:
    ```bash
    npm install
    ```
3.  Ejecutar la aplicación en modo de desarrollo:
    ```bash
    npm run dev
    ```
    La aplicación se abrirá en el puerto que Vite asigne (indicado por consola).

---
