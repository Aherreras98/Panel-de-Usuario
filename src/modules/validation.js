const REGEX = {
    username: /^.{3,}$/, 
    password: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, 
    phone: /^\d{9}$/, 
    zipcode: /^\d{5}$/,
    age: /^(1[8-9]|[2-9]\d)$/ 
};

const ERROR_MESSAGES = {
    username: "El nombre de usuario debe tener al menos 3 caracteres.",
    password: "La contraseña debe tener 8 caracteres, una mayúscula y una minúscula.",
    phone: "El teléfono debe tener exactamente 9 dígitos.",
    zipcode: "El código postal debe tener exactamente 5 dígitos.",
    age: "La edad debe estar entre 18 y 99."
};

export const validationState = {
    username: false,
    password: false,
    phone: false,
    zipcode: false,
    age: true, 
};

const registerBtn = document.getElementById('register-btn');

const checkFormValidity = () => {
    const allValid = Object.values(validationState).every(Boolean);
    registerBtn.disabled = !allValid;
};

const validateField = (input, fieldName) => {
    const errorElement = document.getElementById(`error-${fieldName}`);
    const regex = REGEX[fieldName];
    
    if (regex.test(input.value)) {
        validationState[fieldName] = true;
        errorElement.textContent = "";
    } else {
        validationState[fieldName] = false;
        errorElement.textContent = ERROR_MESSAGES[fieldName];
    }
    
    checkFormValidity();
};

const validateAge = (input) => {
    const errorElement = document.getElementById('error-age');
    const over18 = document.getElementById('reg-over18').checked;

    if (over18) {
        if (input.value === "" || REGEX.age.test(input.value)) {
            validationState.age = true;
            errorElement.textContent = "";
        } else {
            validationState.age = false;
            errorElement.textContent = ERROR_MESSAGES.age;
        }
    } else {
        validationState.age = true;
        errorElement.textContent = "";
    }
    
    checkFormValidity();
};

export const initRegisterValidation = () => {
    document.getElementById('reg-username').addEventListener('blur', (e) => validateField(e.target, 'username'));
    document.getElementById('reg-password').addEventListener('blur', (e) => validateField(e.target, 'password'));
    document.getElementById('reg-phone').addEventListener('blur', (e) => validateField(e.target, 'phone'));
    document.getElementById('reg-zipcode').addEventListener('blur', (e) => validateField(e.target, 'zipcode'));

    const ageInput = document.getElementById('reg-age');
    ageInput.addEventListener('blur', (e) => validateAge(e.target));
    ageInput.addEventListener('input', (e) => validateAge(e.target)); 

    document.getElementById('reg-over18').addEventListener('change', (e) => {
        const ageField = document.getElementById('age-field');
        const ageInput = document.getElementById('reg-age');

        if (e.target.checked) {
            ageField.classList.remove('hidden');
        } else {
            ageField.classList.add('hidden');
            ageInput.value = "";
            validateAge(ageInput);
        }
    });

    document.getElementById('toggle-password').addEventListener('click', () => {
        const passwordInput = document.getElementById('reg-password');
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
    });
    
};

export const resetValidationState = () => {
    validationState.username = false;
    validationState.password = false;
    validationState.phone = false;
    validationState.zipcode = false;
    validationState.age = true;
    
    checkFormValidity();
};