import {Human, IDCard} from "./classes.js";
import {getCards, setCards} from "./localStorage.js";


// CONSTANTS

const form_inputs = document.querySelectorAll('#IDCard-form input, #IDCard-form button')
const disclaimer_checkbox = document.getElementById('disclaimer-agree-checkbox')


// UTILITY

function readFormData() {
    const getValue = (selector: string) => {
        // @ts-ignore
        return document.querySelector(selector).value;
    }

    return {
        number: String(getValue('#IDCard-form #number')),
        holder: {
            firstName: String(getValue('#IDCard-form #holder-firstName')),
            lastName: String(getValue('#IDCard-form #holder-lastName')),
            // @ts-ignore
            birthDate: new Date(getValue('#IDCard-form #holder-birthDate')),
            TAXID: String(getValue('#IDCard-form #holder-TAXID'))
        },
        // @ts-ignore
        photoDataURL: URL.createObjectURL(document.querySelector('#IDCard-form #photo').files[0])
    }
}

function makeIDCard(data: {
    number: string;
    holder: {
        firstName: string;
        lastName: string;
        birthDate: Date;
        TAXID: string;
    };
    photoDataURL: string;
}):IDCard {
    const holder = new Human(
        data.holder.firstName,
        data.holder.lastName,
        data.holder.birthDate,
        data.holder.TAXID
    )
    return new IDCard(
        data.number,
        holder,
        data.photoDataURL
    )
}

function saveIDCard(card:IDCard) {
    const savedCards = getCards()
    savedCards.push(card)
    setCards(savedCards)
}

function addCard() {
    const formData = readFormData()
    const card = makeIDCard(formData)
    saveIDCard(card)
}

function validate_form() {
    for (const input of form_inputs) {
        // @ts-ignore
        if (input.type==='file') {
            // @ts-ignore
            if (String(input.value)=='') { return false }
        } else {
            // @ts-ignore
            if (input.files==undefined || input.files.length==0) { return false }
        }
    }
    return true
}

function form_change() {
    const invalidFormWarning = document.getElementById('invalid-form-warning')
    if (!validate_form()) {
        // @ts-ignore
        invalidFormWarning.classList.add('visible')
    } else {
        // @ts-ignore
        invalidFormWarning.classList.remove('visible')
    }
}


// SCRIPT

// Disable all inputs until the disclaimer is accepted
// @ts-ignore
disclaimer_checkbox.addEventListener('change', _=> {
    // @ts-ignore
    if (disclaimer_checkbox.checked) {
        form_inputs.forEach(form_input => {form_input.removeAttribute('disabled')})
        // @ts-ignore
        document.getElementById('IDCard-form').classList.remove('disabled')
    }
    else {
        form_inputs.forEach(form_input => {form_input.setAttribute('disabled', "true")})
        // @ts-ignore
        document.getElementById('IDCard-form').classList.add('disabled')
    }
})

form_inputs.forEach(form_input => {form_input.addEventListener('change', form_change)})
form_inputs.forEach(form_input => {form_input.setAttribute('disabled', "true")})
// @ts-ignore
document.getElementById('IDCard-form').classList.add('disabled')

const submit_button = document.querySelector('#IDCard-form #submit-button')
// @ts-ignore
submit_button.onclick = addCard