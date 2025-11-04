import { setCookie, getCookie } from '../utils/cookie.js';

const banner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies-btn');

export const initCookieBanner = () => {
    if (!banner || !acceptBtn) {
        return;
    }

    if (getCookie('cookiesAccepted') !== 'true') {
        banner.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365);
        banner.classList.add('hidden');
    });
};