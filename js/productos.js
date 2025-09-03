async function getProducts() {
    const response = await fetch("./data/productos.json");
    const products = await response.json();

    // Simulamos un retraso de 1 segundo antes de devolver los productos
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 1000); // 
    });
}

function crearTarjetaProducto(product) {
    let liProd = document.createElement("li");
    let aProd = document.createElement("a");
    let imgProd = document.createElement("img");
    let divProd = document.createElement("div");
    let nameProd = document.createElement("h2");
    let priceProduct = document.createElement("p");

    aProd.href = "detalle.html?id=" + product.id;
    aProd.className = "tarjeta";

    imgProd.src = product.image;
    imgProd.alt = product.name;

    divProd.className = "info";
    nameProd.innerText = product.name;
    priceProduct.innerText = product.price;

    liProd.appendChild(aProd);
    aProd.appendChild(imgProd);
    liProd.appendChild(divProd);
    divProd.appendChild(nameProd);
    divProd.appendChild(priceProduct);

    return liProd; 
}

async function showProducts() { //funcion que manipula el dom para crear todos los controles de las tarjetas de los productos
    const unorderedListProducts = document.getElementById("ulProductos"); //busca la ul donde van los productos

    const products = await getProducts(); //"carga" los productos

    window.products = products;  //guardamos globalmente para buscador

    products.forEach((product) => {
        unorderedListProducts.appendChild(crearTarjetaProducto(product));
    });
}


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

document.getElementById("buscador").addEventListener("input", (e) => {
    filtrarProductos(e.target.value);
});

showProducts(); //llamado a la funcion
