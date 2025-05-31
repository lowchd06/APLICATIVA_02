document.addEventListener('DOMContentLoaded', () => {
    const fuelCalculatorForm = document.getElementById('fuelCalculatorForm');
    const vehicleTypeSelect = document.getElementById('vehicleType');
    const consumptionKmPerLInput = document.getElementById('consumptionKmPerL');
    const distanceKmInput = document.getElementById('distanceKm');
    const fuelResultDiv = document.getElementById('fuelResultDiv');

    const displayVehicleType = document.getElementById('displayVehicleType');
    const displayConsumption = document.getElementById('displayConsumption');
    const displayDistance = document.getElementById('displayDistance');
    const displayLitersNeeded = document.getElementById('displayLitersNeeded');

    const distanceError = document.getElementById('distanceError');

    
    const vehicleConsumption = {
        'auto_compacto': { min: 14, max: 20 },
        'sedan_mediano': { min: 12, max: 16 },
        'suv_pequena': { min: 10, max: 14 },
        'camioneta_suv_grande': { min: 6, max: 10 },
        'pick_up': { min: 7, max: 12 },
        'auto_hibrido': { min: 20, max: 30 }
    };

   
    const getAverageConsumption = (type) => {
        const data = vehicleConsumption[type];
        if (data) {
            return (data.min + data.max) / 2;
        }
        return 0;
    };

    
    vehicleTypeSelect.addEventListener('change', () => {
        const selectedType = vehicleTypeSelect.value;
        if (selectedType) {
            const avgConsumption = getAverageConsumption(selectedType);
            consumptionKmPerLInput.value = avgConsumption.toFixed(2);
        } else {
            consumptionKmPerLInput.value = '';
        }
    });

  
    distanceKmInput.addEventListener('input', () => {
        const distanceValue = parseFloat(distanceKmInput.value);
        if (isNaN(distanceValue) || distanceValue <= 0) {
            distanceKmInput.classList.add('is-invalid');
            distanceError.textContent = 'La distancia debe ser un número positivo.';
        } else {
            distanceKmInput.classList.remove('is-invalid');
            distanceError.textContent = '';
        }
    });


    fuelCalculatorForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        
        distanceKmInput.classList.remove('is-invalid');
        distanceError.textContent = '';
        vehicleTypeSelect.classList.remove('is-invalid');


    
        const selectedVehicleType = vehicleTypeSelect.value;
        const distanceKm = parseFloat(distanceKmInput.value);
        const consumptionKmPerL = parseFloat(consumptionKmPerLInput.value);

        let isValid = true;

      
        if (selectedVehicleType === '') {
            vehicleTypeSelect.classList.add('is-invalid');
            isValid = false;
        }

        if (isNaN(distanceKm) || distanceKm <= 0) {
            distanceKmInput.classList.add('is-invalid');
            distanceError.textContent = 'La distancia debe ser un número positivo.';
            isValid = false;
        }

        if (!isValid) {
            fuelResultDiv.style.display = 'none'; 
            return; 
        }

  
        if (isNaN(consumptionKmPerL) || consumptionKmPerL <= 0) {
           
            alert('Por favor, seleccione un tipo de vehículo válido para obtener el consumo.');
            fuelResultDiv.style.display = 'none';
            return;
        }

        const litersNeeded = distanceKm / consumptionKmPerL;

      
        displayVehicleType.textContent = vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].text;
        displayConsumption.textContent = consumptionKmPerL.toFixed(2);
        displayDistance.textContent = distanceKm.toFixed(2);
        displayLitersNeeded.textContent = litersNeeded.toFixed(2);

        fuelResultDiv.style.display = 'block'; 
    });
});