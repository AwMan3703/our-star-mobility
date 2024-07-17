import { getCardPasses, getCards, setCardPasses } from "./localStorage.js";
import { redirect } from "./utility.js";
// CONSTANTS
const CURRENT_IDCARD_INDEX = new URLSearchParams(window.location.search).get('cardIndex');
if (!CURRENT_IDCARD_INDEX) {
    redirect('index.html');
}
const IDCARDS = getCards();
// @ts-ignore
const CURRENT_IDCARD_PASSES = getCardPasses(IDCARDS[CURRENT_IDCARD_INDEX]);
const remove_pass_button = document.querySelector('#TravelPass-list-options #remove-pass');
const passes_list = document.getElementById('TravelPass-list');
const list_checkboxes = document.querySelectorAll('#TravelPass-list .TravelPass-selector');
const disclaimer_checkbox = document.getElementById('disclaimer-agree-checkbox');
// FUNCTIONS
function getCurrentCard() {
    // @ts-ignore
    return IDCARDS[CURRENT_IDCARD_INDEX];
}
function _new_travelPassSelector(pass, index) {
    const container = document.createElement('div');
    container.classList.add('TravelPass-selector');
    container.classList.add('material-box');
    container.dataset.passIndex = String(index);
    container.id = `travelPass-selector-${index}`;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = `TravelPass-selector-${index}-checkbox`;
    checkbox.classList.add(`TravelPass-selector-checkbox`);
    checkbox.id = `travelPass-selector-${index}-checkbox`;
    checkbox.addEventListener('click', _ => {
        const selected = get_selected_TravelPasses();
        if (selected.length > 0) {
            // @ts-ignore
            remove_pass_button.removeAttribute('disabled');
            // @ts-ignore
            remove_pass_button.innerText = `Rimuovi titol${selected.length > 1 ? 'i' : 'o'}`;
        }
        else {
            // @ts-ignore
            remove_pass_button.setAttribute('disabled', 'true');
            // @ts-ignore
            remove_pass_button.innerText = 'Rimuovi titolo';
        }
    });
    container.appendChild(checkbox);
    const label = document.createElement('label');
    // @ts-ignore
    label.for = checkbox.id;
    label.innerText = `${pass.from}-${pass.to} ${pass.period}`;
    container.appendChild(label);
    return container;
}
function get_selected_TravelPasses() {
    let selected = [];
    document.querySelectorAll('#TravelPass-list .TravelPass-selector').forEach(e => {
        // @ts-ignore
        if (e.querySelector('.TravelPass-selector-checkbox').checked) {
            // @ts-ignore
            selected.push(parseInt(e.dataset.passIndex));
        }
    });
    console.log(selected);
    return selected;
}
function remove_pass(passIndex) {
    const passes = CURRENT_IDCARD_PASSES;
    passes.splice(passIndex, 1);
    setCardPasses(getCurrentCard(), passes);
    // @ts-ignore
    document.getElementById(`travelPass-selector-${passIndex}`).remove();
}
// SCRIPT
// List the available passes
if (CURRENT_IDCARD_PASSES.length === 0) { // @ts-ignore
    passes_list.classList.add('no-passes');
}
let counter = 0;
CURRENT_IDCARD_PASSES.forEach(pass => {
    // @ts-ignore
    passes_list.appendChild(_new_travelPassSelector(pass, counter));
    counter += 1;
});
// FIXME: inputs are not disabled on launch
// Disable all inputs until the disclaimer is accepted
// @ts-ignore
disclaimer_checkbox.addEventListener('change', _ => {
    // @ts-ignore
    if (disclaimer_checkbox.checked) {
        list_checkboxes.forEach(form_input => { form_input.removeAttribute('disabled'); });
        // @ts-ignore
        passes_list.classList.remove('disabled');
    }
    else {
        list_checkboxes.forEach(form_input => { form_input.setAttribute('disabled', "true"); });
        // @ts-ignore
        passes_list.classList.add('disabled');
    }
});
// @ts-ignore
document.getElementById('add-TravelPass-button').addEventListener('click', _ => {
    redirect('addTravelPass.html');
});
// @ts-ignore
remove_pass_button.addEventListener('click', _ => {
    get_selected_TravelPasses().forEach(passIndex => {
        remove_pass(passIndex);
    });
    redirect('index.html');
});
list_checkboxes.forEach(form_input => { form_input.setAttribute('disabled', "true"); });
// @ts-ignore
passes_list.classList.add('disabled');
