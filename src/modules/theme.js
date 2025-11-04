import { setCookie, getCookie } from '../utils/cookie.js';

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const htmlElement = document.documentElement;

export const initTheme = () => {
    const savedTheme = getCookie('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
};

export const initThemeToggle = () => {
    if (!themeToggleBtn) {
        return;
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = (currentTheme === 'light') ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        setCookie('theme', newTheme, 365);
    });
};