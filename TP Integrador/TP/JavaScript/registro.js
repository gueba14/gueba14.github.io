document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const usuarioValido = validarUsuario();
    const correoValido = validarCorreo();
    const fechaValida = validarFecha();
    const passwordValida = validarPassword();
    const password2Valida = validarPassword2();

    if (usuarioValido && correoValido && fechaValida && passwordValida && password2Valida) {
      alert("Formulario validado correctamente ✅.");
      form.reset();
    } else {
      alert("Hay errores en el formulario ❌.");
    }
  });

  function validarUsuario() {
    const username = document.getElementById('username').value.trim();
    const error = document.getElementById('error-username');
    if (username.length < 3) {
      error.textContent = 'Mínimo 3 caracteres';
      error.style.display = 'block';
      return false;
    } else if (username.length > 20) {
      error.textContent = 'Máximo 20 caracteres';
      error.style.display = 'block';
      return false;
    } else if (username.includes(' ')) {
      error.textContent = 'No se permiten espacios';
      error.style.display = 'block';
      return false;
    } else if (!/^[a-zA-Z0-9]+$/.test(username)) {
      error.textContent = 'Solo letras y números';
      error.style.display = 'block';
      return false;
    } else {
      error.style.display = 'none';
      return true;
    }
  }
  function validarEmail() {
      const email = document.getElementById('email').value.trim();
      const error = document.getElementById('email-error');
      
      // Expresión regular para email válido
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (email === '') {
        error.textContent = 'El email es obligatorio';
        return false;
      } else if (!regex.test(email)) {
        error.textContent = 'Formato inválido (ej: usuario@dominio.com)';
        return false;
      } else {
        error.textContent = '';
        return true;
      }
    }

  function validarCorreo() {
    const correo = document.getElementById('correo').value.trim();
    const error = document.getElementById('error-correo');
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (correo === '') {
        error.textContent = 'El email es obligatorio';
        error.style.display = 'block';
        return false;
    }else if (!regex.test(correo)) {
      error.textContent = 'Correo inválido';
      error.style.display = 'block';
      return false;
    } else {
      error.style.display = 'none';
      return true;
    }   
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
    } else if (nacimiento.getFullYear() < 1900) {
      error.textContent = 'Fecha inválida';
      error.style.display = 'block';
      return false;
    } else {
      error.style.display = 'none';
      return true;
    }
  }

  function validarPassword() {
    const password = document.getElementById('password').value;
    const error = document.getElementById('error-password');
    if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      error.textContent = 'Mínimo 6 caracteres, 1 mayúscula y 1 número';
      error.style.display = 'block';
      return false;
    } else if (password.length > 20) {
      error.textContent = 'Máximo 20 caracteres';
      error.style.display = 'block';
      return false;
    } else if (password.includes(' ')) {
      error.textContent = 'No se permiten espacios';
      error.style.display = 'block';
      return false;
    } else {
      error.style.display = 'none';
      return true;
    }
  }

  function validarPassword2() {
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const error = document.getElementById('error-password2');
    if (password !== password2) {
      error.textContent = 'Las contraseñas no coinciden';
      error.style.display = 'block';
      return false;
    } else if (password2.length < 6 || !/[A-Z]/.test(password2) || !/\d/.test(password2)) {
      error.textContent = 'Mínimo 6 caracteres, una mayúscula y un número';
      error.style.display = 'block';
      return false;
    } else if (password2.length > 20) {
      error.textContent = 'Máximo 20 caracteres';
      error.style.display = 'block';
      return false;
    } else if (password2.includes(' ')) {
      error.textContent = 'No se permiten espacios';
      error.style.display = 'block';
      return false;
    } else {
      error.style.display = 'none';
      return true;
    }
  }
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const correoInput = document.getElementById('correo');
const fechainput = document.getElementById('fecha');
usernameInput.addEventListener('blur', validarUsuario);
usernameInput.addEventListener('input', validarUsuario);
correoInput.addEventListener('blur', validarCorreo);
correoInput.addEventListener('input', validarCorreo);
fechainput.addEventListener('blur', validarFecha);
passwordInput.addEventListener('blur', validarPassword);
passwordInput.addEventListener('input', validarPassword);
passwordInput.addEventListener('blur', validarPassword2);
passwordInput.addEventListener('input', validarPassword2);

});
