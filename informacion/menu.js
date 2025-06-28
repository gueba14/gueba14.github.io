
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuNavegacion = document.getElementById('menu-navegacion');

btnHamburguesa.addEventListener('click', () => {
  menuNavegacion.classList.toggle('activo');
});
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