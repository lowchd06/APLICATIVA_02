document.addEventListener('DOMContentLoaded', () => {
    const salaryForm = document.getElementById('salaryForm');
    const dniInput = document.getElementById('dni');
    const nombreInput = document.getElementById('nombre');
    const cargoSelect = document.getElementById('cargo');
    const sueldoBrutoInput = document.getElementById('sueldoBruto');
    const porcentajeDescuentoInput = document.getElementById('porcentajeDescuento');
    const resultadoDiv = document.getElementById('resultadoDiv');

    const displayDni = document.getElementById('displayDni');
    const displayNombre = document.getElementById('displayNombre');
    const displayCargo = document.getElementById('displayCargo');
    const displaySueldoBruto = document.getElementById('displaySueldoBruto');
    const displayPorcentajeDescuento = document.getElementById('displayPorcentajeDescuento');
    const displaySueldoNeto = document.getElementById('displaySueldoNeto');

    const dniError = document.getElementById('dniError');
    const nombreError = document.getElementById('nombreError');
    const descuentoError = document.getElementById('descuentoError');


    const sueldosPorCargo = {
        'gerente': 5000,
        'analista': 3000,
        'desarrollador': 4000,
        'soporte': 2500
    };

    cargoSelect.addEventListener('change', () => {
        const selectedCargo = cargoSelect.value;
        sueldoBrutoInput.value = sueldosPorCargo[selectedCargo] || '';
    });


    dniInput.addEventListener('input', () => {
        const dniValue = dniInput.value;
        if (!/^\d{8}$/.test(dniValue)) {
            dniInput.classList.add('is-invalid');
            dniError.textContent = 'El DNI debe ser numérico y tener 8 dígitos.';
        } else {
            dniInput.classList.remove('is-invalid');
            dniError.textContent = '';
        }
    });


    nombreInput.addEventListener('input', () => {
        const nombreValue = nombreInput.value;
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombreValue)) {
            nombreInput.classList.add('is-invalid');
            nombreError.textContent = 'El nombre solo debe contener caracteres.';
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreError.textContent = '';
        }
    });

 
    porcentajeDescuentoInput.addEventListener('input', () => {
        const descuentoValue = parseFloat(porcentajeDescuentoInput.value);
        if (isNaN(descuentoValue) || descuentoValue < 0 || descuentoValue > 100) {
            porcentajeDescuentoInput.classList.add('is-invalid');
            descuentoError.textContent = 'El porcentaje debe ser un número entre 0 y 100.';
        } else {
            porcentajeDescuentoInput.classList.remove('is-invalid');
            descuentoError.textContent = '';
        }
    });


    salaryForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

       
        dniInput.classList.remove('is-invalid');
        nombreInput.classList.remove('is-invalid');
        porcentajeDescuentoInput.classList.remove('is-invalid');
        dniError.textContent = '';
        nombreError.textContent = '';
        descuentoError.textContent = '';



        const dni = dniInput.value.trim();
        const nombre = nombreInput.value.trim();
        const cargo = cargoSelect.value;
        const sueldoBruto = parseFloat(sueldoBrutoInput.value);
        const porcentajeDescuento = parseFloat(porcentajeDescuentoInput.value);

        let isValid = true;

  
        if (!/^\d{8}$/.test(dni)) {
            dniInput.classList.add('is-invalid');
            dniError.textContent = 'El DNI debe ser numérico y tener 8 dígitos.';
            isValid = false;
        }

        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) || nombre === '') {
            nombreInput.classList.add('is-invalid');
            nombreError.textContent = 'El nombre solo debe contener caracteres y no puede estar vacío.';
            isValid = false;
        }

        if (cargo === '') {
            cargoSelect.classList.add('is-invalid');
            isValid = false;
        } else {
            cargoSelect.classList.remove('is-invalid');
        }

        if (isNaN(porcentajeDescuento) || porcentajeDescuento < 0 || porcentajeDescuento > 100) {
            porcentajeDescuentoInput.classList.add('is-invalid');
            descuentoError.textContent = 'El porcentaje debe ser un número entre 0 y 100.';
            isValid = false;
        }

        if (!isValid) {
            resultadoDiv.style.display = 'none';
            return; 
        }

   
        const sueldoNeto = sueldoBruto - (sueldoBruto * porcentajeDescuento / 100);

   
        displayDni.textContent = dni;
        displayNombre.textContent = nombre;
        displayCargo.textContent = cargo.charAt(0).toUpperCase() + cargo.slice(1); 
        displaySueldoBruto.textContent = sueldoBruto.toFixed(2);
        displayPorcentajeDescuento.textContent = porcentajeDescuento.toFixed(2);
        displaySueldoNeto.textContent = sueldoNeto.toFixed(2);

        resultadoDiv.style.display = 'block'; 
    });
});