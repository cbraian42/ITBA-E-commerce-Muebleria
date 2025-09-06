//referencias a los controles de contacto.html
const form = document.getElementById("formContacto");
const mensajeExito = document.getElementById("envioExito");
const submitButton = document.getElementById("botonEnviar")
const nombreTxt = document.getElementById("nombreTxt");
const mailTxt = document.getElementById("mailTxt");
const mensajeTxtA = document.getElementById("mensajeTxtA");

function verificadorGenericoInputs(controller) {
    if (controller.value === "") { //se verifica si esta vacio o no
        controller.style.borderColor = "red"; //color del borde del input pasa en rojo como aviso
        return true;
    } else {
        controller.style.borderColor = "#ccc"; //reset del borde del input, cuando no esta vacio
        return false;
    }
}

function verificadorFormContacto(){
    let verificarNombre = verificadorGenericoInputs(nombreTxt);
    let verificarMail = verificadorGenericoInputs(mailTxt);
    let verificarMensaje = verificadorGenericoInputs(mensajeTxtA);
    return verificarNombre || verificarMail || verificarMensaje;
}

//funcion de reemplazo para el submit default
function enviarMensajeDeContacto() {

    if (verificadorFormContacto()) alert("Porfavor complete todos los campos"); //si algun campo esta vacio, salta un alert 
    else { //si ninguno esta vacio
        mensajeExito.hidden = false; //se hace visible el mensaje de exito
        //se deshabilitan los inputs y el boton de submit
        submitButton.disabled = true;
        nombreTxt.disabled = true;
        mailTxt.disabled = true;
        mensajeTxtA.disabled = true;
    }
};

//override para el submit default del form
form.addEventListener("submit", function (event) {
    event.preventDefault();
    enviarMensajeDeContacto();

});