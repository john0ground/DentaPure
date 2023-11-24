const form = document.querySelector('form');
const phone = form.querySelector('#phone');
const onlySpaces = /^ +$/;
const onlyLetters = /^[A-Za-z\s]+$/;

class InputStateData {
    constructor(state, errorMessage) {
        this.state = state;
        this.errorMessage = errorMessage;
    }
}

function verifyName(content) {
    const result = new InputStateData(false, '');

    if (onlySpaces.test(content) || content.length === 0) {
        result.errorMessage = 'Please add a name.'
    } else if (!onlyLetters.test(content)) {
        result.errorMessage = 'Please enter only letters.'
    } else {
        result.state = true;
    }

    return result;
}

function verifyEmail(content) {
    
}

function verifyPhone(content) {
    const result = new InputStateData(false, '');
    
    if (content.length < 6) {
        result.errorMessage = 'Please add a phone number.'
    } else if (content.length < 15) {
        result.errorMessage = 'Please enter a 10 digit number after the area code (+63).'
    } else {
        result.state = true;
    }

    return result;
}

function inputVerifier(id, content) {
    switch (id) {
        case 'name': return verifyName(content);
        case 'phone': return verifyPhone(content);
        case 'email': return verifyEmail(content);
    }
}

function validate(e) {
    const input = e.target;
    const content = input.value;
    const spanError = input.parentNode.querySelector('.error-message');

    const { state, errorMessage } = inputVerifier(input.id, content);

    switch (state) {
        case true:
            input.setAttribute('aria-invalid', 'false');
            input.removeAttribute('aria-errormessage');
            spanError.setAttribute('aria-hidden', 'true');
            break;
        case false:
            input.setAttribute('aria-invalid', 'true');
            spanError.removeAttribute('aria-hidden');
            spanError.textContent = errorMessage;
            input.setAttribute('aria-errormessage', spanError.id);
            break;
        case 'optional':
            input.removeAttribute('aria-invalid');
            input.removeAttribute('aria-errormessage');
            spanError.setAttribute('aria-hidden', 'true');
            break;
    }
}

function countryCodeAltered(content) {
    return !content.startsWith('+63  ') || content === '+63   '? true: false; 
}

function notANumber(char) {
    return !/\d/.test(char)? true: false;
}

function fixedPhoneHandler() {
    let content = phone.value;

    if (notANumber(content[content.length - 1])) content = content.slice(0, -1);
    if (countryCodeAltered(content)) content = '+63  ';
    phone.value = content;
}

phone.addEventListener('input', fixedPhoneHandler);
form.addEventListener('focusout', validate);
