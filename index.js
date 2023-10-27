// ==================================  NAV BAR ACCESSIBILITY  ======================================

const btnToggleNav = document.querySelector('.btn-toggle-nav');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const dropdownLinks = document.querySelectorAll('.dropdown-link');
const dropdownBars = document.querySelectorAll('.dropdown-bars');
const btnDropdownsNav = document.querySelectorAll('.btn-dropdown-nav');
const lastNavLink = document.querySelector('nav .link-last');
const lastDropDownLinks = document.querySelectorAll('.dropdown-last');

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

// ==================================  NAV DROPDOWNS ACCESSIBILITY  ======================================
function toggleDropDownBar(parent, state) {
    console.log(parent);
    const dropdownBar = parent.querySelector('.dropdown-bar');
    
    if (mobileScreen === false) dropdownBar.setAttribute('data-screen', 'desktop');

    state === 'true'? 
    dropdownBar.setAttribute('data-visible', 'false'):
    dropdownBar.setAttribute('data-visible', 'true');
}

function toggleDropdownBtn(e) {
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

        toggleDropDownBar(e.target.parentNode, state);
    }
}

btnDropdownsNav.forEach(btn => btn.addEventListener('click', toggleDropdownBtn));
btnDropdownsNav.forEach(btn => btn.addEventListener('keydown', toggleDropdownBtn));


function hoverDropdownLink(e, state) {
    if (mobileScreen) return;
    e.stopPropagation();
    toggleDropDownBar(e.target, state);
}
dropdownLinks.forEach(link => link.addEventListener('mouseenter',(e) => hoverDropdownLink(e,'false')));
dropdownLinks.forEach(link => link.addEventListener('mouseleave',(e) => hoverDropdownLink(e,'true')));

function focusDropdownLink(parent, state) {
    if (mobileScreen) return;
    if (parent.classList.contains('dropdown-link')) toggleDropDownBar(parent, state);
}

navLinks.forEach(link => link.addEventListener('focus',(e) => focusDropdownLink(e.target.parentNode, 'false')));

//  close dropdown bar after the last focused element
lastDropDownLinks.forEach(link => link.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const liParent = e.target.closest('.dropdown-link');
        focusDropdownLink(liParent, 'true');
    }
}));

(function init() {
    //  initially hides the tab order for the nav links if the screen is mobile.
    if (document.documentElement.clientWidth <= 900) {
        toggleNavFocus(false);
        mobileScreen = true;
    } else {
        nav.setAttribute('data-display', 'true');
        btnDropdownsNav.forEach(btn => btn.style.display = 'none');
    }
})();
