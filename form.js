const form = document.querySelector('form');
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

form.addEventListener('focusout', validate);
