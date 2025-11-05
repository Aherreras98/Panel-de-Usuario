import { showScreen } from '../utils/dom.js';
import { hashData, generateSalt } from '../utils/crypto.js';
import { setCookie } from '../utils/cookie.js';
import { initRegisterValidation, validationState, resetValidationState } from './validation.js';
import { loadPanel } from './panel.js';


const initLogin = () => {
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        loginError.textContent = ""; 

        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value;

        const users = JSON.parse(localStorage.getItem("users") || "{}");
        const user = users[username]; 

        if (!user) {
            loginError.textContent = "Usuario o contraseña incorrectos.";
            return;
        }

        const hashToCompare = await hashData(password + user.salt);

        if (hashToCompare === user.hash) {
            setCookie('session', username, 1);
            loadPanel(username);
            showScreen('screen-panel');
            loginForm.reset();
        } else {
            loginError.textContent = "Usuario o contraseña incorrectos.";
        }
    });
};

export const initAuth = () => {
    console.log("Módulo de autenticación listo.");

    const gotoRegisterLink = document.getElementById('goto-register');
    const gotoLoginLink = document.getElementById('goto-login');

    if (gotoRegisterLink) {
        gotoRegisterLink.addEventListener('click', (event) => {
            event.preventDefault(); 
            showScreen('screen-register');
        });
    }

    if (gotoLoginLink) {
        gotoLoginLink.addEventListener('click', (event) => {
            event.preventDefault();
            showScreen('screen-login');
        });
    }

    initRegisterValidation();
    initLogin();

    const registerForm = document.getElementById('register-form');
    const registerSuccess = document.getElementById('register-success');
    const errorUsername = document.getElementById('error-username');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        registerSuccess.textContent = "";
        errorUsername.textContent = "";

        const allValid = Object.values(validationState).every(Boolean);
        if (!allValid) {
            return; 
        }

        const username = document.getElementById('reg-username').value.trim();
        const password = document.getElementById('reg-password').value;

        const users = JSON.parse(localStorage.getItem("users") || "{}");
        if (users[username]) {
            errorUsername.textContent = "Este nombre de usuario ya existe.";
            return;
        }

        const salt = generateSalt();
        const hash = await hashData(password + salt);

        const user = {
            salt: salt,
            hash: hash,
            phone: document.getElementById('reg-phone').value,
            zipcode: document.getElementById('reg-zipcode').value,
            over18: document.getElementById('reg-over18').checked,
            age: document.getElementById('reg-age').value || null 
        };

        users[username] = user;
        localStorage.setItem("users", JSON.stringify(users));

        registerSuccess.textContent = "¡Registro completado! Redirigiendo a login...";
        registerForm.reset();
        resetValidationState();
        
        setTimeout(() => {
            registerSuccess.textContent = "";
            showScreen('screen-login');
        }, 3000);
    });
};