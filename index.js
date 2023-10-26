const btnToggleNav = document.querySelector('.btn-toggle-nav');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const navBookLink = document.querySelector('nav #link-book');

let displayNav = false;
let mobileScreen = false;

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

//  tab order trap focus if nav bar is displayed.
navBookLink.addEventListener('keydown', (e) => {
    if (e.key === "Tab" && mobileScreen) {
        e.preventDefault();
        btnToggleNav.focus();
    }
});

//  initially hides the tab order for the nav links if the screen is mobile.
(function navTabIndex() {
    if (window.innerWidth <= 700) {
        toggleNavFocus(false);
        mobileScreen = true;
    }
})();