import { TravelPass } from "./classes.js";
import { getCardPasses, getCards, setCardPasses } from "./localStorage.js";
import { capitalize, redirect } from "./utility.js";
// CONSTANTS
const IDCARDS = getCards();
const card_selector_container = document.getElementById('IDCard-selector');
const form_inputs = document.querySelectorAll('#TravelPass-form input, #TravelPass-form button');
const cardSelector_inputs = document.querySelectorAll('#IDCard-selector input, #IDCard-selector button');
const disclaimer_checkbox = document.getElementById('disclaimer-agree-checkbox');
// FUNCTIONS
function _new_IDCardSelector(card, index) {
    const container = document.createElement('div');
    container.classList.add('card-selector-container');
    container.classList.add('material-box');
    const card_selector = document.createElement('input');
    card_selector.id = `card-selector-radio-${crypto.randomUUID()}`;
    card_selector.type = 'radio';
    card_selector.name = 'card-selector';
    card_selector.value = String(index);
    container.appendChild(card_selector);
    const label = document.createElement('label');
    // @ts-ignore
    label.for = card_selector.id;
    label.innerText = `${card.number} (${capitalize(card.holder.firstName)} ${capitalize(card.holder.lastName)})`;
    container.appendChild(label);
    return container;
}
function readFormData() {
    const getValue = (selector) => {
        // @ts-ignore
        return document.querySelector(selector).value;
    };
    const invalidFields = [];
    const checkValid = (value, name) => {
        if (value === undefined || !value)
            invalidFields.push(name);
    };
    const from = getValue('#TravelPass-form #from');
    checkValid(from, 'Origine della tratta');
    const to = getValue('#TravelPass-form #to');
    checkValid(to, 'Capolinea della tratta');
    const line = getValue('#TravelPass-form #line');
    checkValid(line, 'Numero della linea');
    const type = getValue('#TravelPass-form #type');
    checkValid(type, 'Tipologia del titolo');
    const period = getValue('#TravelPass-form #period');
    checkValid(period, 'Periodo di validità');
    const price = getValue('#TravelPass-form #price');
    checkValid(price, 'Prezzo');
    const rate = getValue('#TravelPass-form #rate');
    checkValid(rate, 'Tariffa');
    const purchase_date = getValue('#TravelPass-form #purchase-date');
    checkValid(purchase_date, 'Data di acquisto');
    const purchase_time = getValue('#TravelPass-form #purchase-time');
    checkValid(purchase_time, 'Ora di acquisto');
    const expiry_date = getValue('#TravelPass-form #expiry-date');
    checkValid(expiry_date, 'Data di scadenza');
    const expiry_time = getValue('#TravelPass-form #expiry-time');
    checkValid(expiry_time, 'Ora di scadenza');
    const service = getValue('#TravelPass-form #service');
    checkValid(service, 'Servizio');
    // @ts-ignore
    const qrcodeDataURL = document.querySelector('#TravelPass-form #qrcode').files[0];
    checkValid(qrcodeDataURL, 'Fototessera del titolare');
    if (invalidFields.length > 0) {
        let message = 'Inserire i dati mancanti: ';
        for (const field of invalidFields) {
            message += `\n- ${field}`;
        }
        alert(message);
        return null;
    }
    else {
        return {
            from: String(from),
            to: String(to),
            line: String(line),
            type: String(type),
            period: String(period),
            price: parseFloat(String(price).replace(',', '.')),
            rate: String(rate),
            purchase: new Date(`${purchase_date} ${purchase_time}`),
            expiry: new Date(`${expiry_date} ${expiry_time}`),
            service: String(service),
            qrcodeDataURL: qrcodeDataURL
        };
    }
}
function makeTravelPass(data) {
    return new TravelPass(data.from, data.to, data.line, data.type, data.period, data.price, data.rate, data.purchase, data.expiry, data.service, data.qrcodeDataURL);
}
function saveTravelPass(card, pass) {
    const savedPasses = getCardPasses(card);
    savedPasses.push(pass);
    setCardPasses(card, savedPasses);
}
function getTargetCard() {
    const card_selector = document.querySelector('input[name="card-selector"]:checked');
    if (!card_selector) {
        return null;
    }
    // @ts-ignore
    const cardIndex = parseInt(card_selector.value);
    return IDCARDS[cardIndex];
}
function addTravelPass() {
    const formData = readFormData();
    if (!formData)
        return;
    const pass = makeTravelPass(formData);
    const targetCard = getTargetCard();
    if (!targetCard) {
        alert('Seleziona la tessera a cui abbinare il titolo');
        return;
    }
    saveTravelPass(targetCard, pass);
    alert(`Titolo aggiunto alla tessera ${targetCard.number}`);
    redirect('index.html');
}
// SCRIPT
// Disable all inputs until the disclaimer is accepted
// @ts-ignore
disclaimer_checkbox.addEventListener('change', _ => {
    // @ts-ignore
    if (disclaimer_checkbox.checked) {
        form_inputs.forEach(form_input => { form_input.removeAttribute('disabled'); });
        cardSelector_inputs.forEach(cardSelector_input => { cardSelector_input.removeAttribute('disabled'); });
        // @ts-ignore
        document.getElementById('TravelPass-form').classList.remove('disabled');
        // @ts-ignore
        document.getElementById('IDCard-selector').classList.remove('disabled');
    }
    else {
        form_inputs.forEach(form_input => { form_input.setAttribute('disabled', "true"); });
        cardSelector_inputs.forEach(cardSelector_input => { cardSelector_input.setAttribute('disabled', "true"); });
        // @ts-ignore
        document.getElementById('TravelPass-form').classList.add('disabled');
        // @ts-ignore
        document.getElementById('IDCard-selector').classList.add('disabled');
    }
});
// Add a selector list to target cards
for (let i = 0; i < IDCARDS.length; i++) {
    // @ts-ignore
    card_selector_container.appendChild(_new_IDCardSelector(IDCARDS[i], i));
}
form_inputs.forEach(form_input => { form_input.setAttribute('disabled', "true"); });
cardSelector_inputs.forEach(cardSelector_input => { cardSelector_input.setAttribute('disabled', "true"); });
// @ts-ignore
document.getElementById('TravelPass-form').classList.add('disabled');
// @ts-ignore
document.getElementById('IDCard-selector').classList.add('disabled');
const submit_button = document.querySelector('#TravelPass-form #submit-button');
// @ts-ignore
submit_button.onclick = addTravelPass;
