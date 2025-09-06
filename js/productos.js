// ======= CARGA DE PRODUCTOS =======

async function getProducts() {
    const response = await fetch("./data/productos.json");
    const products = await response.json();

    // Simular retardo de red
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 500); // 500 ms
    });
}

// ======= CREAR TARJETA DE PRODUCTO =======

function crearTarjetaProducto(product) {
    // Elementos
    const liProd = document.createElement("li");
    const aProd = document.createElement("a");
    const imgProd = document.createElement("img");
    const divProd = document.createElement("div");
    const nameProd = document.createElement("h2");
    const priceProduct = document.createElement("p");

    // Enlace a detalle
    aProd.href = "producto.html?id=" + product.id;
    aProd.className = "tarjeta";

    // Imagen
    imgProd.src = product.image;
    imgProd.alt = product.name;

    // Información
    divProd.className = "info";
    nameProd.innerText = product.name;
    priceProduct.innerText = `$${product.price.toLocaleString('es-AR')}`;
    priceProduct.className = "precio";

    // Estructura DOM
    liProd.appendChild(aProd);
    aProd.appendChild(imgProd);
    liProd.appendChild(divProd);
    divProd.appendChild(nameProd);
    divProd.appendChild(priceProduct);

    return liProd;
}

// ======= MOSTRAR PRODUCTOS EN LA PÁGINA =======

async function showProducts() {
    const ulProductos = document.getElementById("ulProductos");
    const products = await getProducts();

    // Guardar global para buscador
    window.products = products;

    // Crear tarjetas
    products.forEach(product => {
        ulProductos.appendChild(crearTarjetaProducto(product));
    });
}

// ======= FILTRAR PRODUCTOS =======

function filtrarProductos(texto) {
    const ul = document.getElementById("ulProductos");
    ul.innerHTML = "";

    const filtrados = window.products.filter(product =>
        product.name.toLowerCase().includes(texto.toLowerCase())
    );

    filtrados.forEach(product => {
        ul.appendChild(crearTarjetaProducto(product));
    });
}

// ======= EVENTO DEL BUSCADOR =======

document.getElementById("buscador").addEventListener("input", (e) => {
    filtrarProductos(e.target.value);
});

// ======= INICIALIZACIÓN =======

showProducts();
