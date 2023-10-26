const btnToggleNav = document.querySelector('.btn-toggle-nav');
const nav = document.querySelector('nav');

let displayNav = false;

function toggleNav(e) {
    if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();

        displayNav = !displayNav;
        displayNav === true?
        btnToggleNav.setAttribute('aria-label', 'close navigation links'):
        btnToggleNav.setAttribute('aria-label', 'open navigation links');

        nav.setAttribute('data-display', displayNav.toString());
    }
}

btnToggleNav.addEventListener('click', toggleNav);
btnToggleNav.addEventListener('keydown', toggleNav);