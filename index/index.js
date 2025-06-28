 const form = document.getElementById('contacto-formulario');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreValido = ValidarNombre();
    const correoValido = validarCorreo();
    const mensajeValido = ValidarMensaje();
    const telefonoValido = ValidarTelefono();

    if (nombreValido && correoValido && mensajeValido) {
        const data = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert("Envio exitoso ✅.");
                form.reset();
            } else {
                alert("Ocurrió un error al enviar el formulario ❌.");
            }
        })
        .catch(error => {
            alert("Error de red: " + error.message);
        });
    } else {
        alert("Errores en el formulario ❌.");
    }
});

function ValidarNombre() {
    const nombre = document.getElementById('nombre').value.trim();
    const errorNombre = document.getElementById('error-nombre');

    if (nombre === '') {
        errorNombre.textContent = 'Debes ingresar tu nombre.';
        errorNombre.style.display = 'block';
        return false;
    }

    if (nombre.length < 3) {
        errorNombre.textContent = 'El nombre debe tener al menos 3 caracteres.';
        errorNombre.style.display = 'block';
        return false;
    }

    if (nombre.length > 25) {
        errorNombre.textContent = 'El nombre no puede tener más de 25 caracteres.';
        errorNombre.style.display = 'block';
        return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        errorNombre.textContent = 'El nombre solo puede contener letras y espacios.';
        errorNombre.style.display = 'block';
        return false;
    }

    errorNombre.style.display = 'none';
    return true;
}

function validarCorreo() {
    const correo = document.getElementById('correo').value.trim();
    const errorCorreo = document.getElementById('error-correo');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (correo === '') {
        errorCorreo.textContent = 'Debes ingresar un correo electrónico.';
        errorCorreo.style.display = 'block';
        return false;
    }

    if (!regex.test(correo)) {
        errorCorreo.textContent = 'Correo inválido';
        errorCorreo.style.display = 'block';
        return false;
    }

    errorCorreo.style.display = 'none';
    return true;
}

function ValidarMensaje() {
    const mensaje = document.getElementById('mensaje').value.trim();
    const errorMensaje = document.getElementById('error-mensaje');

    if (mensaje === '') {
        errorMensaje.textContent = 'Debes ingresar un mensaje.';
        errorMensaje.style.display = 'block';
        return false;
    }

    if (mensaje.length < 50) {
        errorMensaje.textContent = 'El mensaje debe tener al menos 50 caracteres.';
        errorMensaje.style.display = 'block';
        return false;
    }

    errorMensaje.style.display = 'none';
    return true;
}

function ValidarTelefono() {
    const telefono = document.getElementById('telefono').value.trim();
    const errorTelefono = document.getElementById('error-telefono');

    if (telefono !== '' && !/^[0-9+\-\s()]{7,20}$/.test(telefono)) {
        errorTelefono.textContent = 'Teléfono inválido.';
        errorTelefono.style.display = 'block';
        return false;
    }

    errorTelefono.style.display = 'none';
    return true;
}


document.getElementById('nombre').addEventListener('input', ValidarNombre);
document.getElementById('correo').addEventListener('input', validarCorreo);
document.getElementById('mensaje').addEventListener('input', ValidarMensaje);
document.getElementById('telefono').addEventListener('input', ValidarTelefono);


// mensaje de bienvenida en los cuales los botones se mueven

    const mensajes = document.querySelectorAll('.mensaje');
    let actual = 0;

    function mostrarMensaje(index) 
    {
      mensajes.forEach((msg, i) => {
        msg.classList.toggle('activo', i === index);
      });
    }

    function siguiente() 
    {
      actual = (actual + 1) % mensajes.length;
      mostrarMensaje(actual);
    }

    function anterior() 
    {
      actual = (actual - 1 + mensajes.length) % mensajes.length;
      mostrarMensaje(actual);
    }

                    //MENU
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuNavegacion = document.getElementById('menu-navegacion');

btnHamburguesa.addEventListener('click', () => {
  menuNavegacion.classList.toggle('activo');
});

                    //SCROLL
window.onscroll = function() {
  const btn = document.getElementById("btn-Subir");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) 
  {
    btn.style.display = "block";
  } else 
  {
    btn.style.display = "none";
  }
};

document.getElementById("btn-Subir").addEventListener("click", function() 
{
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});