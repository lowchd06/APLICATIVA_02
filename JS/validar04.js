document.addEventListener('DOMContentLoaded', () => {
    const imcCalculatorForm = document.getElementById('imcCalculatorForm');
    const fullNameInput = document.getElementById('fullName');
    const weightKgInput = document.getElementById('weightKg');
    const heightMInput = document.getElementById('heightM');
    const imcResultDiv = document.getElementById('imcResultDiv');

    const displayName = document.getElementById('displayName');
    const displayWeight = document.getElementById('displayWeight');
    const displayHeight = document.getElementById('displayHeight');
    const displayImc = document.getElementById('displayImc');
    const displayClassification = document.getElementById('displayClassification');

    const fullNameError = document.getElementById('fullNameError');
    const weightError = document.getElementById('weightError');
    const heightError = document.getElementById('heightError');

  
    const classifyImc = (imc) => {
        if (imc < 18.5) {
            return { text: 'Bajo peso', class: 'badge-secondary' };
        } else if (imc >= 18.5 && imc < 25.0) {
            return { text: 'Normal', class: 'badge-success' };
        } else if (imc >= 25.0 && imc < 30.0) {
            return { text: 'Sobrepeso', class: 'badge-warning' };
        } else { // 30.0 or more
            return { text: 'Obesidad', class: 'badge-danger' };
        }
    };

   
    fullNameInput.addEventListener('input', () => {
        const value = fullNameInput.value.trim();
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value) || value === '') {
            fullNameInput.classList.add('is-invalid');
            fullNameError.textContent = 'Ingrese solo letras y espacios.';
        } else {
            fullNameInput.classList.remove('is-invalid');
            fullNameError.textContent = '';
        }
    });

   
    weightKgInput.addEventListener('input', () => {
        const value = parseFloat(weightKgInput.value);
        if (isNaN(value) || value <= 0) {
            weightKgInput.classList.add('is-invalid');
            weightError.textContent = 'El peso debe ser un número positivo.';
        } else {
            weightKgInput.classList.remove('is-invalid');
            weightError.textContent = '';
        }
    });

 
    heightMInput.addEventListener('input', () => {
        const value = parseFloat(heightMInput.value);
        if (isNaN(value) || value <= 0) {
            heightMInput.classList.add('is-invalid');
            heightError.textContent = 'La altura debe ser un número positivo.';
        } else {
            heightMInput.classList.remove('is-invalid');
            heightError.textContent = '';
        }
    });

   
    imcCalculatorForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

      
        fullNameInput.classList.remove('is-invalid');
        weightKgInput.classList.remove('is-invalid');
        heightMInput.classList.remove('is-invalid');
        fullNameError.textContent = '';
        weightError.textContent = '';
        heightError.textContent = '';

    
        const fullName = fullNameInput.value.trim();
        const weight = parseFloat(weightKgInput.value);
        const height = parseFloat(heightMInput.value);

        let isValid = true;

      
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(fullName) || fullName === '') {
            fullNameInput.classList.add('is-invalid');
            fullNameError.textContent = 'Ingrese solo letras y espacios.';
            isValid = false;
        }

        if (isNaN(weight) || weight <= 0) {
            weightKgInput.classList.add('is-invalid');
            weightError.textContent = 'El peso debe ser un número positivo.';
            isValid = false;
        }

        if (isNaN(height) || height <= 0) {
            heightMInput.classList.add('is-invalid');
            heightError.textContent = 'La altura debe ser un número positivo.';
            isValid = false;
        }

        if (!isValid) {
            imcResultDiv.style.display = 'none'; 
            return; 
        }

        const imc = weight / (height * height);
        const classification = classifyImc(imc);

        
        displayName.textContent = fullName;
        displayWeight.textContent = weight.toFixed(2);
        displayHeight.textContent = height.toFixed(2);
        displayImc.textContent = imc.toFixed(2);

      
        displayClassification.textContent = classification.text;
        displayClassification.className = `font-weight-bold ${classification.class}`;

        imcResultDiv.style.display = 'block'; 
    });
});