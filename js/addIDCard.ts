import {Human, IDCard} from "./classes.js"
import {getCards, setCards} from "./localStorage.js"
import {redirect} from "./utility.js"


// CONSTANTS

const fileReader = new FileReader();
const photo_input = document.querySelector('#IDCard-form #photo')
const form_inputs = document.querySelectorAll('#IDCard-form input, #IDCard-form button')
const disclaimer_checkbox = document.getElementById('disclaimer-agree-checkbox')


// FUNCTIONS

function readFormData() {
    const getValue = (selector: string) => {
        // @ts-ignore
        return document.querySelector(selector).value
    }
    const invalidFields: string[] = []
    const checkValid = (value: any | null, name: string) => {
        if (value===undefined || !value) invalidFields.push(name)
    }

    const number = getValue('#IDCard-form #number')
    checkValid(number, 'Numero della tessera')
    const firstName = getValue('#IDCard-form #holder-firstName')
    checkValid(firstName, 'Nome del titolare')
    const lastName = getValue('#IDCard-form #holder-lastName')
    checkValid(lastName, 'Cognome del titolare')
    const date = getValue('#IDCard-form #holder-birthDate')
    checkValid(date, 'Data di nascita del titolare')
    const taxid = getValue('#IDCard-form #holder-TAXID')
    checkValid(taxid, 'Codice fiscale del titolare')
    if (fileReader.readyState===fileReader.LOADING) {
        alert('Attendere il caricamento della fototessera...')
        return
    }
    // @ts-ignore
    const photoDataURL = document.querySelector('#IDCard-form #photo').dataset.dataurl
    checkValid(photoDataURL, 'Fototessera del titolare')

    if (invalidFields.length > 0) {
        let message = 'Inserire i dati mancanti: '
        for (const field of invalidFields) {
            message += `\n- ${field}`
        }
        alert(message)
        return null
    } else {
        return {
            number: String(number),
            holder: {
                firstName: String(firstName),
                lastName: String(lastName),
                birthDate: new Date(date),
                TAXID: String(taxid)
            },
            photoDataURL: photoDataURL
        }
    }
}

function makeIDCard(data: {
    number: string
    holder: {
        firstName: string
        lastName: string
        birthDate: Date
        TAXID: string
    }
    photoDataURL: string
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
    if (!formData) {
        alert('Error creating ID card! :(')
        return
    }
    const card = makeIDCard(formData)
    saveIDCard(card)
    alert('Tessera aggiunta')
    redirect('index.html')
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

form_inputs.forEach(form_input => {form_input.setAttribute('disabled', "true")})
// @ts-ignore
document.getElementById('IDCard-form').classList.add('disabled')

// @ts-ignore
photo_input.addEventListener('change', e => {
    // @ts-ignore
    const dataURL = fileReader.readAsDataURL(photo_input.files[0])
    fileReader.addEventListener('load', _ => {
        // @ts-ignore
        photo_input.dataset.dataurl = fileReader.result;
    })
})

// Prevent unborn people from adding an ID Card
const birthDate_input = document.getElementById('holder-birthDate')
// @ts-ignore
birthDate_input.max = new Date().toISOString().split('T')[0]

const submit_button = document.querySelector('#IDCard-form #submit-button')
// @ts-ignore
submit_button.onclick = addCard