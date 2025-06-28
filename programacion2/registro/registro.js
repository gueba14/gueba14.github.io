const form = document.getElementById('registerForm');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const usuarioValido = validarUsuario();
  const correoValido = validarCorreo();
  const fechaValida = validarFecha();
  const generoValido = validarGenero();
  const passwordValida = validarPassword();
  const password2Valida = validarPassword2();
  const terminosValidos = validarTerminos();

  if (usuarioValido && correoValido && fechaValida && generoValido && passwordValida && password2Valida && terminosValidos) {
    
    let usuario = document.getElementById('username').value.trim();
    let correo = document.getElementById('correo').value.trim();
    let contrasena = document.getElementById('password').value;

    try {
      let respuesta = await fetch('registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario,
          correo: correo,
          contrasena: contrasena
        })
      });

      let resultado = await respuesta.json();

      if (resultado.exito) {
        alert(resultado.mensaje);
        window.location.href = "/login/login.html";
        form.reset();
      } else {
        alert(resultado.mensaje);
      }
    } catch (error) {
      alert('Error al conectar con el servidor.');
      console.error(error);
    }

  } else {
    alert("Hay errores en el registro ❌.");
  }
});

function validarUsuario() {
  const username = document.getElementById('username').value.trim();
  const errorUsername = document.getElementById('error-username');

  if (username === '') {
    errorUsername.textContent = 'Debes ingresar un nombre de usuario.';
    errorUsername.style.display = 'block';
    return false;
  }

  if (username.length < 5) {
    errorUsername.textContent = 'El nombre de usuario debe tener al menos 5 caracteres.';
    errorUsername.style.display = 'block';
    return false;
  }

  if (username.length > 20) {
    errorUsername.textContent = 'El nombre de usuario no puede tener más de 20 caracteres.';
    errorUsername.style.display = 'block';
    return false;
  }

  const tieneGuion = /[-_]/.test(username);
  const tieneLetra = /[a-zA-Z]/.test(username);
  const tieneNumero = /\d/.test(username);

  if (!tieneLetra || !tieneNumero || !tieneGuion) {
    errorUsername.innerHTML = 
      'El nombre de usuario debe contener:<br>' +
      '- letras (mayúsculas o minúsculas)<br>' +
      '- números<br>' +
      '- guiones bajos o guiones medios<br>';
    errorUsername.style.display = 'block';
    return false;
  }

  errorUsername.textContent = '';
  errorUsername.style.display = 'none';
  return true;
}

function validarCorreo() {
  const correo = document.getElementById('correo').value.trim();
  const error = document.getElementById('error-correo');
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(correo)) {
    error.textContent = 'Correo inválido';
    error.style.display = 'block';
    return false;
  }
  if (correo.length < 5) {
    error.textContent = 'Mínimo 5 caracteres';
    error.style.display = 'block';
    return false;
  }
  if (correo.length > 50) {
    error.textContent = 'Máximo 50 caracteres';
    error.style.display = 'block';
    return false;
  }
  if (correo.includes(' ')) {
    error.textContent = 'No se permiten espacios';
    error.style.display = 'block';
    return false;
  }

  error.style.display = 'none';
  return true;
}

function validarGenero() {
  const genero = document.getElementById('genero').value;
  const error = document.getElementById('error-genero');

  if (genero === '' || genero === 'Genero') {
    error.textContent = 'Debes seleccionar un género';
    error.style.display = 'block';
    return false;
  }

  error.style.display = 'none';
  return true;
}

function validarFecha() {
  const fecha = document.getElementById('fecha').value;
  const error = document.getElementById('error-fecha');

  if (!fecha) {
    error.textContent = 'Debe ingresar una fecha';
    error.style.display = 'block';
    return false;
  }

  const nacimiento = new Date(fecha);
  const hoy = new Date();
  const edad = hoy.getFullYear() - nacimiento.getFullYear();

  if (nacimiento > hoy || edad < 18) {
    error.textContent = 'Debes ser mayor de 18 años';
    error.style.display = 'block';
    return false;
  }

  if (nacimiento.getFullYear() < 1900) {
    error.textContent = 'Fecha inválida';
    error.style.display = 'block';
    return false;
  }

  error.style.display = 'none';
  return true;
}

function validarPassword() {
  const password = document.getElementById('password').value;
  const errorPassword = document.getElementById('error-password');

  if (password === '') {
    errorPassword.textContent = 'Debes ingresar una contraseña.';
    errorPassword.style.display = 'block';
    return false;
  }

  if (password.length < 6) {
    errorPassword.textContent = 'La contraseña debe tener al menos 6 caracteres.';
    errorPassword.style.display = 'block';
    return false;
  }

  if (password.includes(' ')) {
    errorPassword.textContent = 'La contraseña no puede contener espacios. (Recomendación: usar guiones o guiones bajos)';
    errorPassword.style.display = 'block';
    return false;
  }

  const tieneMinuscula = /[a-z]/.test(password);
  const tieneNumero = /\d/.test(password);
  const tieneGuion = /[-_]/.test(password);

  if (!tieneMinuscula || !tieneNumero || !tieneGuion) {
    errorPassword.innerHTML =
      'La contraseña debe contener:<br>' +
      '- una letra minúscula<br>' +
      '- un número<br>' +
      '- un guion o guion bajo';
    errorPassword.style.display = 'block';
    return false;
  }

  errorPassword.textContent = '';
  errorPassword.style.display = 'none';
  return true;
}

function validarPassword2() {
  const password = document.getElementById('password').value;
  const password2 = document.getElementById('password2').value;
  const error = document.getElementById('error-password2');

  if (password !== password2) {
    error.textContent = 'Las contraseñas no coinciden';
    error.style.display = 'block';
    return false;
  }
  if (password2.length < 6 || !/[A-Z]/.test(password2) || !/\d/.test(password2)) {
    error.textContent = 'Mínimo 6 caracteres, una mayúscula y un número mínimo';
    error.style.display = 'block';
    return false;
  }
  if (password2.length > 20) {
    error.textContent = 'Máximo 20 caracteres';
    error.style.display = 'block';
    return false;
  }
  if (password2.includes(' ')) {
    error.textContent = 'No se permiten espacios';
    error.style.display = 'block';
    return false;
  }

  error.style.display = 'none';
  return true;
}

function validarTerminos() {
  const checkbox = document.getElementById('terminos');
  const error = document.getElementById('error-terminos');

  if (!checkbox.checked) {
    error.textContent = 'Debes aceptar los términos y condiciones.';
    error.style.display = 'block';
    return false;
  }

  error.style.display = 'none';
  return true;
}

// Agregar eventos para validación en tiempo real
document.getElementById('username').addEventListener('blur', validarUsuario);
document.getElementById('username').addEventListener('input', validarUsuario);

document.getElementById('correo').addEventListener('blur', validarCorreo);
document.getElementById('correo').addEventListener('input', validarCorreo);

document.getElementById('fecha').addEventListener('blur', validarFecha);
document.getElementById('fecha').addEventListener('input', validarFecha);

document.getElementById('password').addEventListener('blur', validarPassword);
document.getElementById('password').addEventListener('input', validarPassword);

document.getElementById('password2').addEventListener('blur', validarPassword2);
document.getElementById('password2').addEventListener('input', validarPassword2);

document.getElementById('genero').addEventListener('change', validarGenero);

document.getElementById('terminos').addEventListener('change', validarTerminos);

