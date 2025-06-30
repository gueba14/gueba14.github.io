const form = document.getElementById('loginForm');

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

  const Caracteres = /[-_]/.test(username);
  const Letras = /[a-zA-Z]/.test(username);
  const Numeros = /\d/.test(username);

  if (!Caracteres || !Letras || !Numeros) {
  
    
    errorUsername.innerHTML = 
    'El nombre de usuario debe contener:<br>'+
      '- letras (mayúsculas o minúsculas)<br>'+
      '- números<br>'+
      '- guiones bajos o guiones medios<br>';
    errorUsername.style.display = 'block';
    return false;
  }


  errorUsername.textContent = '';
  errorUsername.style.display = 'none';
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

  errorPassword.textContent = 'Contraseña válida';
  errorPassword.style.display = 'none';
  return true;
}
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

  usernameInput.addEventListener('blur', validarUsuario);
  usernameInput.addEventListener('input', validarUsuario);
  passwordInput.addEventListener('blur', validarPassword);
  passwordInput.addEventListener('input', validarPassword);
