import { setCookie, getCookie } from '../utils/cookie.js';

const banner = document.getElementById('cookie-banner');
const acceptBtn = document.getElementById('accept-cookies-btn');
const rejectBtn = document.getElementById('reject-cookies-btn');

export const initCookieBanner = () => {
    if (!banner || !acceptBtn || !rejectBtn) {
        return;
    }

    const consentGiven = getCookie('cookiesAccepted');
    if (consentGiven === null) {
        banner.classList.remove('hidden');
    }

    acceptBtn.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365);
        banner.classList.add('hidden');
    });

    rejectBtn.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'false', 365);
        banner.classList.add('hidden');
    });
};