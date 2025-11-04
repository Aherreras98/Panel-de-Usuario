import { initAuth } from './modules/auth.js';
import { initTheme, initThemeToggle } from './modules/theme.js';

function initApp() {
    console.log("App iniciada...");
    
    initAuth(); 
    initThemeToggle();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initApp();   
});