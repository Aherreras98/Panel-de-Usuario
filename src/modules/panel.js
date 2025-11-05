import { setCookie } from '../utils/cookie.js';
import { showScreen } from '../utils/dom.js';

const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('logout-btn');

export const loadPanel = (username) => {
    if (welcomeMessage) {
        welcomeMessage.textContent = `Bienvenido, ${username}`;
    }
};

export const initPanel = () => {
    if (!logoutBtn) {
        return;
    }

    logoutBtn.addEventListener('click', () => {
        setCookie('session', '', -1);
        showScreen('screen-login');
    });
};