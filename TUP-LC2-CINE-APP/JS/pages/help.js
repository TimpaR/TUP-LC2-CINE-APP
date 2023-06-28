const btn = document.getElementById('button');

let body = ""
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  let mensaje = document.getElementById("sec_mensajeError");
  btn.value = 'Enviando...';

  const serviceID = 'default_service';
  const templateID = 'template_anr7x4k';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      body += `<p class="succes">Email enviado con exito</p>`
      mensaje.innerHTML = body
      var objDiv = document.getElementById("sec_mensajeError");
      objDiv.scrollTop = objDiv.scrollHeight;
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
});


function validarEmail() {
  var mensajes = document.getElementById('sec_mensajeError')
  var body = ""
  var email = document.getElementById('email_id').value
  // Expresión regular para validar el formato del correo electrónico
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email = re.test(email);
  console.log(email)
  if (email) {
      body+=`<p class="succes">Email Valido</p>`        
      mensajes.innerHTML = body
  } else {
      body+=`<p class="error">Ingrese un Email válido</p>`        
      mensajes.innerHTML = body
  }
}

function limpiar() {
  document.getElementById("form").reset();
}