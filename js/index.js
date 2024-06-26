import { getCardPasses, getCards } from "./localStorage.js";
let CURRENT_IDCARD_INDEX = 0;
let IDCARDS = getCards();
let CURRENT_IDCARD_PASSES = [];
// FUNCTIONS
function getCurrentCard() {
    return IDCARDS[CURRENT_IDCARD_INDEX];
}
function _new_passCard(card, pass, i) {
    const isPassValid = pass.expiry >= new Date(Date()) || true;
    const container = document.createElement('div');
    container.classList.add('pass-card');
    container.style.setProperty('--card-color', `var(--theme-color-${pass.cardcolor})`);
    const logo = document.createElement('img');
    logo.classList.add('logo');
    logo.src = './src/logo_white.png';
    container.appendChild(logo);
    const validity_label_container = document.createElement('div');
    validity_label_container.classList.add('validity-label-container');
    validity_label_container.classList.add('hstack');
    validity_label_container.classList.add(`${isPassValid ? 'valid' : 'expired'}-pass`);
    const validity_label = document.createElement('p');
    validity_label.classList.add('validity-label');
    validity_label.innerText = `abbonamento ${isPassValid ? 'valido' : 'scaduto'}`;
    validity_label_container.appendChild(validity_label);
    container.appendChild(validity_label_container);
    const idcard_number = document.createElement('p');
    idcard_number.classList.add('idcard-number');
    idcard_number.innerText = `tessera nº ${card.number}`;
    container.appendChild(idcard_number);
    const divider = document.createElement('hr');
    divider.classList.add('divider');
    container.appendChild(divider);
    const route_title = document.createElement('p');
    route_title.classList.add('route-title');
    route_title.innerText = `percorso`;
    container.appendChild(route_title);
    const route = document.createElement('p');
    route.classList.add('route');
    route.innerHTML = `${pass.from}<br>${pass.to}`;
    container.appendChild(route);
    // ID card
    const idcard_container = document.createElement('div');
    idcard_container.classList.add('idcard-container');
    // ID card details
    const idcard_details_container = document.createElement('div');
    idcard_details_container.classList.add('idcard-detailscontainer');
    const idcard_pass_type = document.createElement('p');
    idcard_pass_type.classList.add('idcard-details');
    idcard_pass_type.classList.add('idcard-passtype');
    idcard_pass_type.innerText = `${pass.type.replace(/ .*/, '')}`;
    idcard_details_container.appendChild(idcard_pass_type);
    const idcard_pass_period = document.createElement('p');
    idcard_pass_period.classList.add('idcard-details');
    idcard_pass_period.classList.add('idcard-passperiod');
    idcard_pass_period.innerText = `${pass.period}`;
    idcard_details_container.appendChild(idcard_pass_period);
    const idcard_pass_expiry_date = document.createElement('p');
    idcard_pass_expiry_date.classList.add('idcard-details');
    idcard_pass_expiry_date.classList.add('idcard-passpurchase');
    idcard_pass_expiry_date.classList.add('idcard-passpurchase-date');
    idcard_pass_expiry_date.innerText = `${pass.expiry.getDate()}/${pass.expiry.getMonth() + 1}/${pass.expiry.getFullYear()} ${pass.expiry.getHours()}:${pass.expiry.getMinutes()}:${pass.expiry.getSeconds()}`;
    idcard_details_container.appendChild(idcard_pass_expiry_date);
    idcard_container.appendChild(idcard_details_container);
    //
    const idcard_photo_container = document.createElement('div');
    idcard_photo_container.classList.add('idcard-photo-container');
    const idcard_photo = document.createElement('img');
    idcard_photo.classList.add('idcard-photo');
    idcard_photo.src = `${card.photoDataURL}`;
    idcard_photo_container.appendChild(idcard_photo);
    idcard_container.appendChild(idcard_photo_container);
    const idcard_stripes_container = document.createElement('div');
    idcard_stripes_container.classList.add('idcard-stripes-container');
    idcard_stripes_container.classList.add(`${isPassValid ? 'valid' : 'expired'}-pass`);
    const idcard_stripes = document.createElement('div');
    idcard_stripes.classList.add('idcard-stripes');
    idcard_stripes_container.appendChild(idcard_stripes);
    idcard_container.appendChild(idcard_stripes_container);
    container.appendChild(idcard_container);
    //
    // Pass details
    const details_container = document.createElement('div');
    details_container.classList.add('details-container');
    details_container.classList.add('hstack');
    const details_left = document.createElement('div');
    const service_type = document.createElement('p');
    service_type.classList.add('details');
    service_type.classList.add('details-servicetype');
    service_type.innerText = `Servizio: ${pass.service.toUpperCase()}`;
    details_left.appendChild(service_type);
    const pass_type = document.createElement('p');
    pass_type.classList.add('details');
    pass_type.classList.add('details-passtype');
    pass_type.innerText = `${pass.type}`;
    details_left.appendChild(pass_type);
    const purchase_date = document.createElement('p');
    purchase_date.classList.add('details');
    purchase_date.classList.add('details-purchasedate');
    purchase_date.innerText = `Acquistato il: ${pass.purchase.getDate()}/${pass.purchase.getMonth() + 1}/${pass.purchase.getFullYear()}`;
    details_left.appendChild(purchase_date);
    details_container.appendChild(details_left);
    const verticaldivider = document.createElement('hr');
    verticaldivider.classList.add('details');
    verticaldivider.classList.add('vertical-divider');
    details_container.appendChild(verticaldivider);
    const details_right = document.createElement('div');
    const rate = document.createElement('p');
    rate.classList.add('details');
    rate.classList.add('details-rate');
    rate.innerText = `Tariffa: ${pass.rate}`;
    details_right.appendChild(rate);
    const price = document.createElement('p');
    price.classList.add('details');
    price.classList.add('details-price');
    price.innerText = `Importo: ${pass.price} €`;
    details_right.appendChild(price);
    const pass_number = document.createElement('p');
    pass_number.classList.add('details');
    pass_number.classList.add('details-number');
    pass_number.innerText = `Nº titolo: ${i}`;
    details_right.appendChild(pass_number);
    details_container.appendChild(details_right);
    container.appendChild(details_container);
    //
    const holder_name = document.createElement('p');
    holder_name.classList.add('holder-name');
    holder_name.innerText = `${card.holder.firstName} ${card.holder.lastName}`;
    container.appendChild(holder_name);
    const holder_taxID = document.createElement('p');
    holder_taxID.classList.add('holder-taxID');
    holder_taxID.innerText = `${card.holder.TAXID}`;
    container.appendChild(holder_taxID);
    const qrcode_block = document.createElement('div');
    qrcode_block.id = `pass-card-qrcode-${crypto.randomUUID()}`;
    qrcode_block.classList.add('qrcode');
    container.appendChild(qrcode_block);
    const qrURL = 'google.com';
    // @ts-ignore
    const qrcode = new QRCode(qrcode_block, {
        text: qrURL,
        width: 190,
        height: 190,
        colorDark: '#000',
        colorLight: '#fff'
    });
    const info = document.createElement('p');
    info.classList.add('info');
    info.innerHTML = 'STAR Mobility S.p.A.<br>Viale Italia, 100 26900 Lodi C.F. e P.Iva 01927790186';
    container.appendChild(info);
    return container;
}
function _new_passCard_dot(i) {
    const dot = document.createElement('div');
    dot.classList.add('pass-card-dot');
    dot.dataset.index = String(i);
    return dot;
}
function refresh_passes() {
    const carousel = document.getElementById('pass-cards-carousel');
    const dots = document.getElementById('pass-cards-dots');
    // @ts-ignore
    carousel.innerHTML = '';
    let counter = 0;
    CURRENT_IDCARD_PASSES.forEach(pass => {
        // @ts-ignore
        carousel.appendChild(_new_passCard(getCurrentCard(), pass, counter + 1));
        // @ts-ignore
        dots.appendChild(_new_passCard_dot(counter + 1));
        counter += 1;
    });
}
function selectIDCard(index) {
    CURRENT_IDCARD_INDEX = index;
    CURRENT_IDCARD_PASSES = getCardPasses(IDCARDS[index]);
    console.log(`Current IDCard has ${CURRENT_IDCARD_PASSES.length} passes`);
    refresh_passes();
}
// SCRIPT
const IDCard_count = getCards().length;
if (IDCard_count < 1) {
    console.warn('No IDCard detected, redirecting to addIDCard...');
    //redirect('addIDCard.html')
}
else {
    console.info(`${IDCard_count} IDCard(s) found`);
}
// Do this so everything gets properly loaded
selectIDCard(0);
