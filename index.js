// ==================================  NAV BAR ACCESSIBILITY  ======================================

const btnToggleNav = document.querySelector('.btn-toggle-nav');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const btnDropdownsNav = document.querySelectorAll('.btn-dropdown-nav');
const lastNavLink = document.querySelector('nav .link-last');

let displayNav = false;
let mobileScreen = false;

function toggleNavFocus(state) {
    if (state === true) {
        navLinks.forEach(link => link.removeAttribute('tabindex'));
        btnDropdownsNav.forEach(btn => btn.removeAttribute('tabindex'));
    } else {
        navLinks.forEach(link => link.setAttribute('tabindex', '-1'));
        btnDropdownsNav.forEach(btn => btn.setAttribute('tabindex', '-1'));
    }
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

//  trap focus if nav bar is displayed.
lastNavLink.addEventListener('keydown', (e) => {
    if (e.key === "Tab" && mobileScreen) {
        e.preventDefault();
        btnToggleNav.focus();
    }
});

//  initially hides the tab order for the nav links if the screen is mobile.
(function navTabIndex() {
    if (document.documentElement.clientWidth <= 700) {
        toggleNavFocus(false);
        mobileScreen = true;
    }
})();

// ==================================  NAV DROPDOWNS ACCESSIBILITY  ======================================
function toggleDropdown(e) {
    if (e.type === 'click' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();

        const state = e.target.dataset.extend;
        
        if (state === 'true') {
            e.target.setAttribute('data-extend', 'false');
            e.target.setAttribute('aria-label', 'Extend Dropdown Links');
            e.target.classList.remove('dropdown-extend');
        } else {
            e.target.setAttribute('data-extend', 'true');
            e.target.setAttribute('aria-label', 'Close Dropdown Links');
            e.target.classList.add('dropdown-extend');
        }
    }
}

btnDropdownsNav.forEach(btn => btn.addEventListener('click', toggleDropdown));
btnDropdownsNav.forEach(btn => btn.addEventListener('keydown', toggleDropdown));