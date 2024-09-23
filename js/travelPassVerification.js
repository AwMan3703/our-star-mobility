import { passDataFromURL } from "./utility.js";
// SCRIPT
function setElementText(id, text) {
    const e = document.getElementById(id) || document.querySelector(id);
    // @ts-ignore
    e.textContent = text;
}
const passData = passDataFromURL(window.location.search);
// check if the pass is valid, then set the page evaluation label accordingly
const passExpiry = new Date(passData.pass_expiry);
const isPassValid = passExpiry >= new Date() || true;
const evaluationIcon = document.getElementById('evaluation-icon');
// @ts-ignore
evaluationIcon.classList.remove('glyphicon-hand-right');
// @ts-ignore
evaluationIcon.classList.add(isPassValid ? 'glyphicon-thumbs-up' : 'glyphicon-thumbs-down');
// @ts-ignore
evaluationIcon.style.color = isPassValid ? 'green' : 'red';
setElementText('evaluation', `Abbonamento ${isPassValid ? 'Valido' : 'Scaduto'}!`);
// @ts-ignore
document.getElementById('evaluation').style.color = isPassValid ? 'green' : 'red';
// compile a bunch of elements with url parameter values
setElementText('IDCard-number', passData.card_number);
setElementText('holder-lastname', passData.holder.last_name);
setElementText('holder-name', passData.holder.name);
setElementText('travelPass-type', passData.pass_type.replace(/ .*/, ''));
setElementText('travelPass-type-extended', passData.pass_type);
setElementText('travelPass-validity', passData.pass_validity);
setElementText('travelPass-from', passData.pass_from);
setElementText('travelPass-to', passData.pass_to);
setElementText('travelPass-variant', passData.pass_variant);
setElementText('travelPass-price', parseFloat(passData.pass_price).toFixed(2));
setElementText('travelPass-purchase', passData.pass_purchase);
// @ts-ignore
document.getElementById('IDCard-photo').src = passData.photo_dataURL;
