import {Human, IDCard, TravelPass} from "./classes.js";
import {getCardPasses, getCards, setCardPasses} from "./localStorage.js";
import {redirect} from "./utility.js";


// CONSTANTS

const IDCARDS:IDCard[] = getCards()

const card_selector_container = document.getElementById('IDCard-selector')
const form_inputs = document.querySelectorAll('#TravelPass-form input, #TravelPass-form button')
const disclaimer_checkbox = document.getElementById('disclaimer-agree-checkbox')


// FUNCTIONS

//TODO / tweak
function readFormData() {
    const getValue = (selector: string) => {
        // @ts-ignore
        return document.querySelector(selector).value;
    }

    return {
        number: String(getValue('#TravelPass-form #number')),
        holder: {
            firstName: String(getValue('#TravelPass-form #holder-firstName')),
            lastName: String(getValue('#TravelPass-form #holder-lastName')),
            // @ts-ignore
            birthDate: new Date(getValue('#TravelPass-form #holder-birthDate')),
            TAXID: String(getValue('#TravelPass-form #holder-TAXID'))
        },
        // @ts-ignore
        photoDataURL: URL.createObjectURL(document.querySelector('#TravelPass-form #photo').files[0])
    }
}

//TODO / tweak
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

//TODO / tweak
function saveIDCard(card:IDCard) {
    const savedCards = getCards()
    savedCards.push(card)
    setCards(savedCards)
}

function getTargetCard() {
    // @ts-ignore
    const cardIndex = parseInt(document.querySelector('input[name="card-selector"]:checked').value);
    return IDCARDS[cardIndex];
}

//TODO / tweak
function addCard() {
    const formData = readFormData()
    const card = makeIDCard(formData)
    saveIDCard(card)
    alert('Tessera aggiunta')
    redirect('index.html')
}

//TODO / tweak
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

// Add a selector list to target cards
for (let i = 0; i < IDCARDS.length; i++) {
    // Input.name="card-selector"
    const card_selector = document.createElement('input')
    card_selector.type = 'radio'
    card_selector.name = 'card-selector'
    card_selector.value = String(i)
    // @ts-ignore
    card_selector_container.appendChild(card_selector)
}

form_inputs.forEach(form_input => {form_input.addEventListener('change', form_change)})
form_inputs.forEach(form_input => {form_input.setAttribute('disabled', "true")})
// @ts-ignore
document.getElementById('IDCard-form').classList.add('disabled')

const submit_button = document.querySelector('#TravelPass-form #submit-button')
// @ts-ignore
submit_button.onclick = addCard