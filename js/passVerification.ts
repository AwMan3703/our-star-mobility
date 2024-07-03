import {passDataFromURL} from "./utility.js";


// SCRIPT

const URLParameters = new URLSearchParams(window.location.search);

function setElementText(id: string, text: string) {
    const e = document.getElementById(id) || document.querySelector(id)
    // @ts-ignore
    e.textContent = text;
}


// check if the pass is valid, then set the page evaluation label accordingly
// @ts-ignore
const passExpiry = new Date(URLParameters.get('expiry'))
const isPassValid = passExpiry >= new Date(Date()) || true

const evaluationIcon = document.getElementById('evaluation-icon')
// @ts-ignore
evaluationIcon.classList.remove('glyphicon-hand-right')
// @ts-ignore
evaluationIcon.classList.add(isPassValid ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down')
// @ts-ignore
evaluationIcon.style.color = isPassValid ? 'green' : 'red'

setElementText('evaluation', `Abbonamento ${isPassValid ? 'Valido' : 'Scaduto'}!`)
// @ts-ignore
document.getElementById('evaluation').style.color = isPassValid ? 'green' : 'red'

const passData = passDataFromURL(window.location.search)

// compile a bunch of elements with url parameter values
setElementText('IDCard-number', passData.card_number)
setElementText('holder-lastname', passData.holder.last_name)
setElementText('holder-name', passData.holder.name)
setElementText('travelPass-type', passData.pass_type.replace(/ .*/,''))
setElementText('travelPass-type-extended', passData.pass_type)
setElementText('travelPass-validity', passData.pass_validity)
setElementText('travelPass-from', passData.pass_from)
setElementText('travelPass-to', passData.pass_to)
setElementText('travelPass-variant', passData.pass_variant)
setElementText('travelPass-price', passData.pass_price)
setElementText('travelPass-purchase', passData.pass_purchase)

// set IDCard photo src somehow
// TODO: figure this out
// Because the image dataURL is like 20000 characters long
// and that's not gonna fly in a qrcode
// MAYBE use pastebin?