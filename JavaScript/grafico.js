
const categorias_gan = ['Sueldo', 'Ahorro', 'Deposito', 'Otros'];
const categorias_gas = ['Vivienda', 'Ropa', 'Necesidades', 'Accesorios', 'Electrodomesticos', 'Salud', 'Muebles', 'Seguro', 'Impuestos', 'Comida'];
const colores_gan = ['#4dabf7', '#63e6be', '#fcc419', '#ff8787'];
const colores_gas = ['#4dabf7', '#63e6be', '#fcc419', '#ff8787', '#ced4da', '#fbff00', '#543acb', '#93df47', '#e469e2', '#913e4d'];
const montos_gan = [0, 0, 0, 0]; // todas las categorías comienzan en 0
const montos_gas = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // todas las categorías comienzan en 0

const ctx_gan = document.getElementById('graficoGanancias').getContext('2d');
const grafico_gan = new Chart(ctx_gan, {
    type: 'doughnut',
    data: {
    labels: categorias_gan,
    datasets: [{
        data: montos_gan,
        backgroundColor: colores_gan,
        borderWidth: 2
    }]
    },
    options: {
    cutout: '0%',
    plugins: {
        legend: { display: false }
    }
    }
});


const ctx_gas = document.getElementById('graficoGastos').getContext('2d');
const grafico_gas = new Chart(ctx_gas, {
    type: 'doughnut',
    data: {
    labels: categorias_gas,
    datasets: [{
        data: montos_gas,
        backgroundColor: colores_gas,
        borderWidth: 2
    }]
    },
    options: {
    cutout: '0%',
    plugins: {
        legend: { display: false }
    }
    }
});


function actualizarTotal_gan() {
    const total_gan = montos_gan.reduce((acc, val) => acc + val, 0);
    document.getElementById('totalGanancias').innerText = `Total Ganancias: $${total_gan.toFixed(2)}`;
}

function actualizarLeyenda_ganancias() {
    const leyenda_gan = document.getElementById('leyenda_ganancias');
    leyenda_gan.innerHTML = '';
    categorias_gan.forEach((cat, i) => {
    leyenda_gan.innerHTML += `
        <div><span style="color:${colores_gan[i]};">●</span> ${cat} <strong>$${montos_gan[i].toFixed(2)}</strong></div>
    `;
    });
}

function modificarGanancias(accion) {
    const monto_gan = parseFloat(document.getElementById('monto_gan').value);
    const categoria_gan = document.getElementById('categorias_ganancias').value;


    if (isNaN(monto_gan) || monto_gan <= 0) {
    alert("Ingrese un monto válido.");
    return;
    }

    const index = categorias_gan.indexOf(categoria_gan);

    if (accion === '+') {
    montos_gan[index] += monto_gan;
    } else if (accion === '-') {
    if (montos_gan[index] < monto_gan) {
        alert("No puede retirar más de lo que hay en la categoría.");
        return;
    }
    montos_gan[index] -= monto_gan;
    }

    grafico_gan.data.datasets[0].data = montos_gan;
    grafico_gan.update();
    actualizarLeyenda_ganancias();
    actualizarTotal_gan();
    document.getElementById('monto_gan').value = '';
    Balance();
}

//Gastos

function actualizarTotal_gas() {
    const total_gas = montos_gas.reduce((acc, val) => acc + val, 0);
    document.getElementById('totalGastos').innerText = `Total Gastos: $${total_gas.toFixed(2)}`;
}

function actualizarLeyenda_gastos() {
    const leyenda_gas = document.getElementById('leyenda_gastos');
    leyenda_gas.innerHTML = '';
    categorias_gas.forEach((cat, i) => {
    leyenda_gas.innerHTML += `
        <div><span style="color:${colores_gas[i]};">●</span> ${cat} <strong>$${montos_gas[i].toFixed(2)}</strong></div>
    `;
    });
}

function modificarGastos(accion) {
    const monto_gas = parseFloat(document.getElementById('monto_gas').value);
    const categoria_gas = document.getElementById('categorias_gastos').value;


    if (isNaN(monto_gas) || monto_gas <= 0) {
    alert("Ingrese un monto válido.");
    return;
    }

    const index = categorias_gas.indexOf(categoria_gas);

    if (accion === '+') {
    montos_gas[index] += monto_gas;
    } else if (accion === '-') {
    if (montos_gas[index] < monto_gas) {
        alert("No puede retirar más de lo que hay en la categoría.");
        return;
    }
    montos_gas[index] -= monto_gas;
    }

    grafico_gas.data.datasets[0].data = montos_gas;
    grafico_gas.update();
    actualizarLeyenda_gastos();
    actualizarTotal_gas();
    document.getElementById('monto_gas').value = '';
    Balance();
}
function Balance(){    
    const balance = ((montos_gan.reduce((acc, val) => acc + val, 0))-(montos_gas.reduce((acc, val) => acc + val, 0)));
    document.getElementById('balance').innerText = `Total balance es de: $${balance.toFixed(2)}`;
    
}
function descargarPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    const canvas = document.getElementById('graficoGanancias');
    const totalTexto = document.getElementById('totalGanancias').innerText;
    const canvas_2 = document.getElementById('graficoGastos');
    const totalTexto_2 = document.getElementById('totalGastos').innerText;
    const leyenda_gan = document.getElementById('leyenda_ganancias');
    const leyenda_gas = document.getElementById('leyenda_gastos');
    leyenda_gas.innerHTML = '';
    
    pdf.setFontSize(18);
    pdf.text("Resumen de Balance:", 10, 15);
    pdf.setFontSize(12);
    pdf.text(totalTexto, 10, 25);
    
    categorias_gan.forEach((cat, i) => {
        pdf.setTextColor(colores_gan[i])
        pdf.text(cat.concat(" = $").concat(montos_gan[i].toFixed(2)),10,31+i*6)
    });
    const imgData = canvas.toDataURL("image/png", 1.0);
    const imgData_2 = canvas_2.toDataURL("image/png", 1.0);
    pdf.addImage(imgData, 'PNG', 90, 20, 60, 60);
    
    pdf.setTextColor("#000000")
    pdf.text(totalTexto_2, 10, 85);    
    
    categorias_gas.forEach((cat, i) => {
        pdf.setTextColor(colores_gas[i])
        pdf.text(cat.concat(" = $").concat(montos_gas[i].toFixed(2)),10,92+i*6)
    });
    pdf.addImage(imgData_2, 'PNG', 90, 86, 60, 60);

    pdf.setTextColor("#000000")
    pdf.text(("Tu balance total es de = $".concat((montos_gan.reduce((acc, val) => acc + val, 0))-(montos_gas.reduce((acc, val) => acc + val, 0)))), 10, 160); 
    pdf.save("resumen_gastos.pdf");
}

actualizarLeyenda_ganancias();
actualizarTotal_gan();
actualizarLeyenda_gastos();
actualizarTotal_gas();
