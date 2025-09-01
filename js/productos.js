const productList = [ //lista de productos
    {
        id: "1",
        name: "Aparador Uspallata",
        price: 100000,
        description: "",
        image: "img/Aparador_Uspallata.png"
    },
    {
        id: "2",
        name: "Biblioteca Recoleta",
        price: 120000,
        description: "",
        image: "img/Biblioteca-Recoleta.png"
    }
]

function getProducts() { //funcion que simula la carga de los productos
    return new Promise((resolve) => {
        setTimeout(() => { //simula la espera de la carga de datos 
            resolve(productList); 
            //podriamos poner un "reject"
            //pero siendo que es una simulacion y nunca va a fallar la solicitud
            //no creo que haga falta
        }, 2000);
    })
}

async function showProducts() { //funcion que manipula el dom para crear todos los controles de las tarjetas de los productos
    const unorderedListProducts = document.getElementById("ulProductos"); //busca la ul donde van los productos

    const products = await getProducts(); //"carga" los productos

    products.forEach(product => { //crea los controles para cada producto
        let liProd = document.createElement("li");
        let aProd = document.createElement("a");
        let imgProd = document.createElement("img");
        let divProd = document.createElement("div");
        let nameProd = document.createElement("h2");
        let priceProduct = document.createElement("p");

        //seteo de atributos de los controles
        aProd.href = "detalle.html?id=" + product.id;
        aProd.className = "tarjeta";

        imgProd.src = product.image;
        imgProd.alt = product.name;

        divProd.className = "info";
        nameProd.innerText = product.name;
        priceProduct.innerText = product.price;

        //asignacion de jerarquia de los controles
        unorderedListProducts.appendChild(liProd);
        liProd.appendChild(aProd);
        aProd.appendChild(imgProd);
        liProd.appendChild(divProd);
        divProd.appendChild(nameProd);
        divProd.appendChild(priceProduct);

    });
}

showProducts(); //lamado a la funcion 