const form = document.getElementById('registerForm');

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

// Agregar eventos para validación en tiempo real
document.getElementById('username').addEventListener('blur', validarUsuario);
document.getElementById('username').addEventListener('input', validarUsuario);

document.getElementById('correo').addEventListener('blur', validarCorreo);
document.getElementById('correo').addEventListener('input', validarCorreo);

document.getElementById('password').addEventListener('blur', validarPassword);
document.getElementById('password').addEventListener('input', validarPassword);

