//referencias a los controles de contacto.html
const form = document.getElementById("formContacto");
const successMessage = document.getElementById("envioExito");
const submitButton = document.getElementById("botonEnviar")
const nameTxt = document.getElementById("nombreTxt");
const emailTxt = document.getElementById("mailTxt");
const messageTxtA = document.getElementById("mensajeTxtA");

//funcion para verificar que no esten vacios los inputs (el regex del mail lo maneja html, por el tipo de input)
function verifyContactFields() {
    let stop = false; //bool q maneja si el form se "envia" o no

    if (nameTxt.value === "") { //se verifica si esta vacio o no
        stop = true; //si un solo campo esta vacio no se envia el form
        nameTxt.style.borderColor = "red"; //color del borde del input pasa en rojo como aviso
    } else nameTxt.style.borderColor = "#ccc"; //reset del borde del input, cuando no esta vacio


    if (emailTxt.value === "") {
        stop = true;
        emailTxt.style.borderColor = "red";
    } else emailTxt.style.borderColor = "#ccc";

    if (messageTxtA.value === "") {
        stop = true;
        messageTxtA.style.borderColor = "red";
    } else messageTxtA.style.borderColor = "#ccc";

    return stop;
};

//funcion de reemplazo para el submit default
function sendMessage() {

    if (verifyContactFields()) alert("Porfavor complete todos los campos"); //si "stop" es T, salta un alert 
    else { //si "stop" es F
        successMessage.hidden = false; //se hace visible el mensaje de exito
        //se deshabilitan los inputs y el boton de submit
        submitButton.disabled = true;
        nameTxt.disabled = true;
        emailTxt.disabled = true;
        messageTxtA.disabled = true;
    }
};

//override para el submit default del form
form.addEventListener("submit", function (event) {
    event.preventDefault();
    sendMessage();

});