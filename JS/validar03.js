document.addEventListener('DOMContentLoaded', () => {
    const loanCalculatorForm = document.getElementById('loanCalculatorForm');
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanTermInput = document.getElementById('loanTerm');
    const loanResultDiv = document.getElementById('loanResultDiv');

    const displayLoanAmount = document.getElementById('displayLoanAmount');
    const displayInterestRate = document.getElementById('displayInterestRate');
    const displayLoanTerm = document.getElementById('displayLoanTerm');
    const displayInterest = document.getElementById('displayInterest');
    const displayTotalAmount = document.getElementById('displayTotalAmount');

    const loanAmountError = document.getElementById('loanAmountError');
    const interestRateError = document.getElementById('interestRateError');
    const loanTermError = document.getElementById('loanTermError');

 
    loanAmountInput.addEventListener('input', () => {
        const value = parseFloat(loanAmountInput.value);
        if (isNaN(value) || value <= 0) {
            loanAmountInput.classList.add('is-invalid');
            loanAmountError.textContent = 'El monto del préstamo debe ser un número positivo.';
        } else {
            loanAmountInput.classList.remove('is-invalid');
            loanAmountError.textContent = '';
        }
    });


    interestRateInput.addEventListener('input', () => {
        const value = parseFloat(interestRateInput.value);
        if (isNaN(value) || value <= 0) {
            interestRateInput.classList.add('is-invalid');
            interestRateError.textContent = 'La tasa de interés debe ser un número positivo.';
        } else {
            interestRateInput.classList.remove('is-invalid');
            interestRateError.textContent = '';
        }
    });

   
    loanTermInput.addEventListener('input', () => {
        const value = parseFloat(loanTermInput.value);
        if (isNaN(value) || value <= 0) {
            loanTermInput.classList.add('is-invalid');
            loanTermError.textContent = 'El plazo en años debe ser un número positivo.';
        } else {
            loanTermInput.classList.remove('is-invalid');
            loanTermError.textContent = '';
        }
    });

  
    loanCalculatorForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

      
        loanAmountInput.classList.remove('is-invalid');
        interestRateInput.classList.remove('is-invalid');
        loanTermInput.classList.remove('is-invalid');
        loanAmountError.textContent = '';
        interestRateError.textContent = '';
        loanTermError.textContent = '';

  
        const principal = parseFloat(loanAmountInput.value);
        const rate = parseFloat(interestRateInput.value);
        const time = parseFloat(loanTermInput.value);

        let isValid = true;

   
        if (isNaN(principal) || principal <= 0) {
            loanAmountInput.classList.add('is-invalid');
            loanAmountError.textContent = 'El monto del préstamo debe ser un número positivo.';
            isValid = false;
        }

        if (isNaN(rate) || rate <= 0) {
            interestRateInput.classList.add('is-invalid');
            interestRateError.textContent = 'La tasa de interés debe ser un número positivo.';
            isValid = false;
        }

        if (isNaN(time) || time <= 0) {
            loanTermInput.classList.add('is-invalid');
            loanTermError.textContent = 'El plazo en años debe ser un número positivo.';
            isValid = false;
        }

        if (!isValid) {
            loanResultDiv.style.display = 'none'; 
            return; 
        }

        
        const interest = (principal * rate * time) / 100;
        const totalAmount = principal + interest;

       
        displayLoanAmount.textContent = principal.toFixed(2);
        displayInterestRate.textContent = rate.toFixed(2);
        displayLoanTerm.textContent = time.toFixed(2);
        displayInterest.textContent = interest.toFixed(2);
        displayTotalAmount.textContent = totalAmount.toFixed(2);

        loanResultDiv.style.display = 'block'; 
    });
});