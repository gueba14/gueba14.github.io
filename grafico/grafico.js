    // Categorías y colores
  const categorias_gan = 
  [
    'Sueldo', 
    'Ahorro', 
    'Deposito', 
    'Inversiones', 
    'Otros'
  ];

  const colores_gan = 
  [
    '#4dabf7',
    '#63e6be', 
    '#fcc419', 
    '#ff8787', 
    '#ced4da'
  ];
  const categorias_gas = 
  [
    'Hogar', 
    'Ropa y Accesorios',
    'Art. del hogar',
    'Servicios', 
    'Préstamos', 
    'Salud', 
    'Seguro', 
    'Impuestos', 
    'Alimentación', 
    'Transporte', 
    'Inversiones',
    'Educación'
  ];

  const colores_gas = 
  [ 
    '#f94144',
    '#f3722c',
    '#f9844a',
    '#f9c74f',
    '#90be6d',
    '#43aa8b',
    '#577590',
    '#8d99ae',
    '#d90429',
    '#ef476f',
    '#06d6a0',
    '#059669', 
    '#118ab2', 
    '#073b4c', 
    '#ffb703'
  ];

  let montos_gan = Array(categorias_gan.length).fill(0);
  let montos_gas = Array(categorias_gas.length).fill(0);

const ctxGan = document.getElementById('graficoGanancias').getContext('2d');
const graficoGan = new Chart(ctxGan, 
{
    type: 'doughnut',
    data: 
    {
      labels: categorias_gan,
      datasets: 
      [{ 
        data: montos_gan, 
        backgroundColor: colores_gan, 
        borderWidth: 2 
      }]
    },
    options: 
    { 
      cutout: '70%', 
      plugins: 
      { legend: 
        {
          display: false 
        } 
      } 
    }
});

  const ctxGas = document.getElementById('graficoGastos').getContext('2d');
  const graficoGas = new Chart(ctxGas, 
{
    type: 'doughnut',
    data: 
    {
      labels: categorias_gas,
      datasets: 
      [{ 
        data: montos_gas,
        backgroundColor: colores_gas, 
        borderWidth: 2 
      }]
    },
    options: 
     {
       cutout: '70%',
        plugins: 
        { legend: 
          { display: false 

          } 
        } 
      }
});

  function actualizarTotalGan() {
    const total = montos_gan.reduce((a, b) => a + b, 0);
    document.getElementById('totalGanancias').innerText = `Total: $${total.toFixed(2)}`;
    return total;
  }

  function actualizarTotalGas() {
    const total = montos_gas.reduce((a, b) => a + b, 0);
    document.getElementById('totalGastos').innerText = `Total: $${total.toFixed(2)}`;
    return total;
  }

function actualizarLeyendaGan() {
  const leyenda = document.getElementById('leyenda_ganancias');
  const items = leyenda.querySelectorAll('div');

  montos_gan.forEach((monto, i) => {
    const strong = items[i].querySelector('strong');
    if (strong) strong.innerText = `$${monto.toFixed(2)}`;
  });
}

function actualizarLeyendaGas() {
  const leyenda = document.getElementById('leyenda_gastos');
  const items = leyenda.querySelectorAll('div');

  montos_gas.forEach((monto, i) => {
    const strong = items[i].querySelector('strong');
    if (strong) strong.innerText = `$${monto.toFixed(2)}`;
  });
}

  function modificarGanancias(accion) {
    const monto = parseFloat(document.getElementById('monto_gan').value);
    const categoria = document.getElementById('categorias_ganancias').value;
    if (isNaN(monto) || monto <= 0) 
    { 
      alert("Ingresa un monto."); return; 
    }
    const index = categorias_gan.indexOf(categoria);
    
    if (index === -1) 
    { 
      alert("Selecciona una categoría."); 
      
      return; 
    }

    if (accion === '+') 
    {
      montos_gan[index] += monto;
    } 
    else 
    {
      if (montos_gan[index] < monto) 
      { 
        alert("Nose puede retirar más de lo que hay en la categoría."); 
        return; 
      }
      
      montos_gan[index] -= monto;
    }
    actualizarTodo();
    document.getElementById('monto_gan').value = '';
  }

  function modificarGastos(accion) 
  {
    const monto = parseFloat(document.getElementById('monto_gas').value);
    const categoria = document.getElementById('categorias_gastos').value;
    
    if (isNaN(monto) || monto <= 0) 
    {
       alert("Ingresa un monto."); return; 
    }
    const index = categorias_gas.indexOf(categoria);
    if (index === -1) 
    { 
      alert("Selecciona una categoría."); return; 
    }

    if (accion === '+') 
    {
      montos_gas[index] += monto;
    } 
    else 
    {
      if (montos_gas[index] < monto) 
      { 
        alert("No puede retirar más de lo que hay en la categoría."); return; 
      }
      montos_gas[index] -= monto;
    }

    actualizarTodo();
    document.getElementById('monto_gas').value = '';
  }

 function actualizarTodo() {
  graficoGan.data.datasets[0].data = montos_gan;
  graficoGan.update();
  actualizarLeyendaGan();
  const totalGan = actualizarTotalGan();

  graficoGas.data.datasets[0].data = montos_gas;
  graficoGas.update();
  actualizarLeyendaGas();
  const totalGas = actualizarTotalGas();

  const balance = totalGan - totalGas;
  const balanceSpan = document.getElementById('balance');
  balanceSpan.innerText = `$${balance.toFixed(2)}`;
  balanceSpan.style.color = balance >= 0 ? 'green' : 'red';

}


function descargarPDF() {

  const { jsPDF } = window.jspdf;
  const html2canvas = window.html2canvas;

  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Resumen de Ganancias y Gastos", 10, y);
  y += 10;

  const balanceText = document.getElementById('balance').textContent;
  doc.setFontSize(12);
  doc.text(`Balance Total: ${balanceText}`, 10, y); y += 10;

  const totalGan = document.getElementById('totalGanancias').textContent;
  const totalGas = document.getElementById('totalGastos').textContent;
  doc.text(`Ganancias: ${totalGan}`, 10, y); y += 10;
  doc.text(`Gastos: ${totalGas}`, 10, y); y += 10;

  y += 5;
  doc.setFontSize(14);
  doc.text("Categorías de Ganancias:", 10, y); y += 8;
  categorias_gan.forEach((cat, i) => {
    const color = colores_gan[i];
    const monto = montos_gan[i].toFixed(2);
    doc.setTextColor(0, 0, 0);
    doc.text(`${cat}: $${monto}`, 15, y);
    doc.setFillColor(color);
    doc.circle(10, y - 2, 2, 'F');
    y += 6;
  });

  const yGrafGan = y - categorias_gan.length * 6 - 8;

  y += 5;
  doc.setFontSize(14);
  doc.text("Categorías de Gastos:", 10, y); y += 8;
  categorias_gas.forEach((cat, i) => {
    const color = colores_gas[i];
    const monto = montos_gas[i].toFixed(2);
    doc.setTextColor(0, 0, 0);
    doc.text(`${cat}: $${monto}`, 15, y);
    doc.setFillColor(color);
    doc.circle(10, y - 2, 2, 'F');
    y += 6;
  });

  const yGrafGasOffset = 20;
  const yGrafGas = yGrafGan + 80 + yGrafGasOffset;

  Promise.all([
    html2canvas(document.getElementById('graficoGanancias')),
    html2canvas(document.getElementById('graficoGastos')),
  ]).then(([canvasGan, canvasGas]) => {
    const imgGan = canvasGan.toDataURL('image/png');
    const imgGas = canvasGas.toDataURL('image/png');

    doc.setFontSize(12);
    doc.text("Ganancias", 110, yGrafGan - 2);
    doc.addImage(imgGan, 'PNG', 110, yGrafGan, 80, 80);

    doc.text("Gastos", 110, yGrafGas - 2);
    doc.addImage(imgGas, 'PNG', 110, yGrafGas, 80, 80);

    doc.save("balance.pdf");
  });
}

  actualizarTodo();

  
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
document.getElementById("btn-Subir").addEventListener("click", function() 
{
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});