import { getCardPasses, getCards } from "./localStorage";
let CURRENT_IDCARD_INDEX = 0;
let IDCARDS = [];
let CURRENT_IDCARD_PASSES = [];
// UTILITY
function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1, text.length);
}
function getCurrentCard() {
    return IDCARDS[CURRENT_IDCARD_INDEX];
}
// UI
function _new_passCard(card, pass, pass_number) {
    const container = document.createElement('div');
    container.classList.add('pass-card-container');
    const logo = document.createElement('img');
    logo.classList.add('pass-card-logo');
    logo.src = '../src/logo_white.png';
    container.appendChild(logo);
    const validity_label = document.createElement('p');
    validity_label.classList.add('pass-card-validitylabel');
    validity_label.innerText = `abbonamento ${pass.expiry >= new Date() ? 'valido' : 'scaduto'}`;
    container.appendChild(validity_label);
    const idcard_number = document.createElement('p');
    idcard_number.classList.add('pass-card-idcardnumber');
    idcard_number.innerText = `tessera nº ${card.number}`;
    container.appendChild(idcard_number);
    const divider = document.createElement('hr');
    divider.classList.add('pass-card-divider');
    container.appendChild(divider);
    const route_title = document.createElement('p');
    route_title.classList.add('pass-card-routetitle');
    route_title.innerText = `percorso`;
    container.appendChild(route_title);
    const route = document.createElement('p');
    route.classList.add('pass-card-route');
    route.innerHTML = `${pass.from}<br>${pass.to}`;
    container.appendChild(route);
    // ID card
    const idcard_container = document.createElement('div');
    idcard_container.classList.add('pass-card-idcard-container');
    // ID card details
    const idcard_details_container = document.createElement('div');
    idcard_details_container.classList.add('pass-card-idcard-detailscontainer');
    const idcard_pass_type = document.createElement('p');
    idcard_pass_type.classList.add('pass-card-idcard-details');
    idcard_pass_type.classList.add('pass-card-idcard-passtype');
    idcard_pass_type.innerText = `${pass.type.replace(/ .*/, '')}`;
    idcard_details_container.appendChild(idcard_pass_type);
    const idcard_pass_period = document.createElement('p');
    idcard_pass_type.classList.add('pass-card-idcard-details');
    idcard_pass_period.classList.add('pass-card-idcard-passperiod');
    idcard_pass_period.innerText = `${pass.period}`;
    idcard_details_container.appendChild(idcard_pass_period);
    const idcard_pass_expiry_date = document.createElement('p');
    idcard_pass_type.classList.add('pass-card-idcard-details');
    idcard_pass_type.classList.add('pass-card-idcard-passpurchase');
    idcard_pass_expiry_date.classList.add('pass-card-idcard-passpurchase-date');
    idcard_pass_expiry_date.innerText = `${pass.expiry.getDate()}/${pass.expiry.getMonth() + 1}/${pass.expiry.getFullYear()}`;
    idcard_details_container.appendChild(idcard_pass_expiry_date);
    const idcard_pass_expiry_time = document.createElement('p');
    idcard_pass_type.classList.add('pass-card-idcard-details');
    idcard_pass_type.classList.add('pass-card-idcard-passpurchase');
    idcard_pass_expiry_time.classList.add('pass-card-idcard-passpurchase-time');
    idcard_pass_expiry_time.innerText = `${pass.expiry.getHours()}:${pass.expiry.getMinutes()}:${pass.expiry.getSeconds()}`;
    idcard_details_container.appendChild(idcard_pass_expiry_time);
    idcard_container.appendChild(idcard_details_container);
    //
    const idcard_photo = document.createElement('img');
    idcard_photo.classList.add('pass-card-idcard-photo');
    idcard_photo.src = card.photoDataURL;
    idcard_container.appendChild(idcard_photo);
    const idcard_stripes = document.createElement('div');
    idcard_stripes.classList.add('pass-card-idcard-stripes');
    idcard_container.appendChild(idcard_stripes);
    container.appendChild(idcard_container);
    //
    // Pass details
    const details_container = document.createElement('div');
    details_container.classList.add('pass-card-detailscontainer');
    const service_type = document.createElement('p');
    service_type.classList.add('pass-card-details');
    service_type.classList.add('pass-card-details-servicetype');
    service_type.innerText = `${pass.service.toUpperCase()}`;
    details_container.appendChild(service_type);
    const pass_type = document.createElement('p');
    pass_type.classList.add('pass-card-details');
    pass_type.classList.add('pass-card-details-passtype');
    pass_type.innerText = `${pass.type}`;
    details_container.appendChild(pass_type);
    const purchase_date = document.createElement('p');
    purchase_date.classList.add('pass-card-details');
    purchase_date.classList.add('pass-card-details-purchasedate');
    purchase_date.innerText = `Acquistato il: ${pass.purchase.getDate()}/${pass.purchase.getMonth() + 1}/${pass.purchase.getFullYear()}`;
    details_container.appendChild(purchase_date);
    const verticaldivider = document.createElement('hr');
    verticaldivider.classList.add('pass-card-details');
    verticaldivider.classList.add('pass-card-verticaldivider');
    details_container.appendChild(verticaldivider);
    const rate = document.createElement('p');
    rate.classList.add('pass-card-details');
    rate.classList.add('pass-card-details-rate');
    rate.innerText = `Tariffa: ${pass.rate}`;
    details_container.appendChild(rate);
    const price = document.createElement('p');
    price.classList.add('pass-card-details');
    price.classList.add('pass-card-details-price');
    price.innerText = `Importo: ${pass.price} €`;
    details_container.appendChild(price);
    const card_number = document.createElement('p');
    card_number.classList.add('pass-card-details');
    card_number.classList.add('pass-card-details-number');
    card_number.innerText = `Nº titolo: ${pass_number}`;
    details_container.appendChild(card_number);
    //
    const holder_name = document.createElement('p');
    holder_name.classList.add('pass-card-holdername');
    holder_name.innerText = `${capitalize(card.holder.firstName)} ${capitalize(card.holder.lastName)}`;
    container.appendChild(holder_name);
    const holder_taxID = document.createElement('p');
    holder_taxID.classList.add('pass-card-holdertaxID');
    holder_taxID.innerText = `${card.holder.TAXID.toUpperCase()}`;
    container.appendChild(holder_taxID);
    const qrcode = document.createElement('img');
    qrcode.classList.add('pass-card-qrcode');
    qrcode.src = '../src/qrcode.jpeg';
    container.appendChild(qrcode);
    return container;
}
function refresh_passes() {
    const carousel = document.getElementById('passes-carousel');
    // @ts-ignore
    carousel.innerHTML = '';
    let counter = 0;
    CURRENT_IDCARD_PASSES.forEach(pass => {
        // @ts-ignore
        carousel.appendChild(_new_passCard(getCurrentCard(), pass, counter + 1));
        counter += 1;
    });
}
function selectIDCard(index) {
    CURRENT_IDCARD_INDEX = index;
    CURRENT_IDCARD_PASSES = getCardPasses(IDCARDS[index]);
    refresh_passes();
}
// SCRIPT
if (getCards().length < 1)
    window.location.replace('addIDCard.html');
// Do this so everything gets properly loaded
selectIDCard(0);
