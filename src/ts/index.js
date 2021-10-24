import initHeaderAnimation from './header';
import initStretch from './stretch';
window.addEventListener('DOMContentLoaded', () => {
    const noTransitionOnLoadElements = document.querySelectorAll('.no-transition-on-load');
    noTransitionOnLoadElements.forEach((element) => element.classList.remove('no-transition-on-load'));
    initHeaderAnimation();
    initStretch();
});
