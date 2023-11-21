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
    const errorInfoNode = input.parentNode.querySelector('span');

    const result = inputVerifier(input.id, content);

    switch (result.state) {
        case true:
            input.setAttribute('data-valid', 'true');
            errorInfoNode.removeAttribute('data-visible');
            break;
        case false:
            input.setAttribute('data-valid', 'false');
            errorInfoNode.setAttribute('data-visible', '');
            errorInfoNode.textContent = result.errorMessage;
            break;
        case 'optional':
            input.setAttribute('data-valid', 'optional');
            errorInfoNode.removeAttribute('data-visible');
            break;
    }
}

form.addEventListener('input', validate);
