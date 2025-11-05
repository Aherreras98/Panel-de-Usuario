import { initAuth } from './modules/auth.js';
import { initTheme, initThemeToggle } from './modules/theme.js';
import { initCookieBanner } from './modules/cookieBanner.js';
import { initPanel } from './modules/panel.js';

function initApp() {
    console.log("App iniciada...");
    
    initAuth(); 
    initThemeToggle();
    initCookieBanner();
    initPanel();
}

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initApp();   
});