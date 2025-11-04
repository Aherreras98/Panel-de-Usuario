import { initAuth } from './modules/auth.js';

function initApp() {
    console.log("App iniciada...");
    
    initAuth(); 
}

document.addEventListener('DOMContentLoaded', initApp);