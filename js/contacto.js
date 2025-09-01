//referencias a los controles de contacto.html
const form = document.getElementById("formContacto");
const successMessage = document.getElementById("envioExito");
const submitButton = document.getElementById("botonEnviar")
const nameTxt = document.getElementById("nombreTxt");
const emailTxt = document.getElementById("mailTxt");
const messageTxtA = document.getElementById("mensajeTxtA");

function genericVerifyer(controller) {
    if (controller.value === "") { //se verifica si esta vacio o no
        controller.style.borderColor = "red"; //color del borde del input pasa en rojo como aviso
        return true;
    } else {
        controller.style.borderColor = "#ccc"; //reset del borde del input, cuando no esta vacio
        return false;
    }
}

function contactFormChecker(){
    let verifyName = genericVerifyer(nameTxt);
    let verifyEmail = genericVerifyer(emailTxt);
    let verifyMessage = genericVerifyer(messageTxtA);
    return verifyName || verifyEmail || verifyMessage;
}

//funcion de reemplazo para el submit default
function sendMessage() {

    if (contactFormChecker()) alert("Porfavor complete todos los campos"); //si algun campo esta vacio, salta un alert 
    else { //si ninguno esta vacio
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