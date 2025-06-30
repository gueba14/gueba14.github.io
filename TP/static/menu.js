
const btnHamburguesa = document.getElementById('btn-hamburguesa');
const menuNavegacion = document.getElementById('menu-navegacion');

btnHamburguesa.addEventListener('click', () => {
  menuNavegacion.classList.toggle('activo');
});
window.onscroll = function() {
  const btn = document.getElementById("btn-Subir");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100)
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