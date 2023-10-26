const btnToggleNav = document.querySelector('.btn-toggle-nav');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a'); 

let displayNav = false;

function toggleNavFocus(state) {
    state === true?
    navLinks.forEach(link => link.removeAttribute('tabindex')):
    navLinks.forEach(link => link.setAttribute('tabindex', '-1'));
}

function toggleNavBar(e) {
    if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();

        displayNav = !displayNav;
        displayNav === true?
        btnToggleNav.setAttribute('aria-label', 'close navigation links'):
        btnToggleNav.setAttribute('aria-label', 'open navigation links');

        nav.setAttribute('data-display', displayNav.toString());
        toggleNavFocus(displayNav);
    }
}

btnToggleNav.addEventListener('click', toggleNavBar);
btnToggleNav.addEventListener('keydown', toggleNavBar);

//  initially hides the tab order for the nav links if the screen is mobile.
(function navTabIndex() {
    if (window.innerWidth <= 700) {
        toggleNavFocus(false);
    }
})();
