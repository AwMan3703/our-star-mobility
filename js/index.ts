import {IDCard, TravelPass} from "./classes.js"
import {getCardPasses, getCards, setCardPasses} from "./localStorage.js";
import {shortenURL} from "./shortenURL.js";
import {passDataToURLParameters, prettyDate, prettyTime, redirect} from "./utility.js";

let CURRENT_IDCARD_INDEX: number = 0
let IDCARDS:IDCard[] = getCards()
let CURRENT_IDCARD_PASSES:TravelPass[] = []

// HANDLES

const passCard_carousel = document.getElementById('pass-cards-carousel')

const cardSelector = document.getElementById('IDCard-selector')
const cardSelector_drawer = document.getElementById('IDCard-selector-drawer')
const cardSelector_level = document.getElementById('IDCard-selector-level')
const cardSelector_button = document.getElementById('IDCard-selector-button')


// FUNCTIONS

function getCurrentCard() {
    return IDCARDS[CURRENT_IDCARD_INDEX]
}

function _new_passCard(card:IDCard, pass:TravelPass, i:number):HTMLElement {
    const isPassValid = pass.expiry >= new Date(Date())

    const container = document.createElement('div')
    container.classList.add('pass-card')
    container.id = `pass-card-${i}`
    container.dataset.itemIndex = String(i)
    container.style.setProperty('--card-color', `var(--theme-color-${pass.cardcolor})`)

    const logo = document.createElement('img')
    logo.classList.add('logo')
    logo.src = './src/logo_white.png'
    container.appendChild(logo)

    const validity_label_container = document.createElement('div')
    validity_label_container.classList.add('validity-label-container')
    validity_label_container.classList.add('hstack')
    validity_label_container.classList.add(`${isPassValid ? 'valid' : 'expired'}-pass`)

    const validity_label = document.createElement('p')
    validity_label.classList.add('validity-label')
    validity_label.innerText = `abbonamento ${isPassValid ? 'valido' : 'scaduto'}`
    validity_label_container.appendChild(validity_label)

    container.appendChild(validity_label_container)

    const idcard_number = document.createElement('p')
    idcard_number.classList.add('idcard-number')
    idcard_number.innerText = `tessera nº ${card.number}`
    container.appendChild(idcard_number)

    const divider = document.createElement('hr')
    divider.classList.add('divider')
    container.appendChild(divider)

    const route_title = document.createElement('p')
    route_title.classList.add('route-title')
    route_title.innerText = `percorso`
    container.appendChild(route_title)

    const route = document.createElement('p')
    route.classList.add('route')
    route.innerHTML = `${pass.from}<br>${pass.to}`
    container.appendChild(route)

        // ID card
        const idcard_container = document.createElement('div')
        idcard_container.classList.add('idcard-container')

            // ID card details
            const idcard_details_container = document.createElement('div')
            idcard_details_container.classList.add('idcard-detailscontainer')

            const idcard_pass_type  = document.createElement('p')
            idcard_pass_type.classList.add('idcard-details')
            idcard_pass_type.classList.add('idcard-passtype')
            idcard_pass_type.innerText = `${pass.type.replace(/ .*/,'')}`
            idcard_details_container.appendChild(idcard_pass_type)

            const idcard_pass_period  = document.createElement('p')
            idcard_pass_period.classList.add('idcard-details')
            idcard_pass_period.classList.add('idcard-passperiod')
            idcard_pass_period.innerText = `${pass.period}`
            idcard_details_container.appendChild(idcard_pass_period)

            const idcard_pass_clock  = document.createElement('p')
            idcard_pass_clock.classList.add('idcard-details')
            idcard_pass_clock.classList.add('idcard-clock')
            idcard_pass_clock.classList.add('real-time-clock')
            idcard_details_container.appendChild(idcard_pass_clock)

            idcard_container.appendChild(idcard_details_container)
            //

        const idcard_photo_container = document.createElement('div')
        idcard_photo_container.classList.add('idcard-photo-container')

        const idcard_photo = document.createElement('img')
        idcard_photo.classList.add('idcard-photo')
        idcard_photo.src = `${card.photoDataURL}`
        idcard_photo_container.appendChild(idcard_photo)

        idcard_container.appendChild(idcard_photo_container)

        const idcard_stripes_container = document.createElement('div')
        idcard_stripes_container.classList.add('idcard-stripes-container')
        idcard_stripes_container.classList.add(`${isPassValid ? 'valid' : 'expired'}-pass`)

        const idcard_stripes = document.createElement('div')
        idcard_stripes.classList.add('idcard-stripes')
        idcard_stripes_container.appendChild(idcard_stripes)

        idcard_container.appendChild(idcard_stripes_container)

        container.appendChild(idcard_container)
        //

        // Pass details
        const details_container = document.createElement('div')
        details_container.classList.add('details-container')
        details_container.classList.add('hstack')

        const details_left = document.createElement('div')

        const service_type = document.createElement('p')
        service_type.classList.add('details')
        service_type.classList.add('details-servicetype')
        service_type.innerText = `Servizio: ${pass.service.toUpperCase()}`
        details_left.appendChild(service_type)

        const pass_type = document.createElement('p')
        pass_type.classList.add('details')
        pass_type.classList.add('details-passtype')
        pass_type.innerText = `${pass.type}`
        details_left.appendChild(pass_type)

        const purchase_date = document.createElement('p')
        purchase_date.classList.add('details')
        purchase_date.classList.add('details-purchasedate')
        purchase_date.innerText = `Acquistato il: ${pass.purchase.getDate()}/${pass.purchase.getMonth() + 1}/${pass.purchase.getFullYear()}`
        details_left.appendChild(purchase_date)

        details_container.appendChild(details_left)

        const verticaldivider = document.createElement('hr')
        verticaldivider.classList.add('details')
        verticaldivider.classList.add('vertical-divider')
        details_container.appendChild(verticaldivider)

        const details_right = document.createElement('div')

        const rate = document.createElement('p')
        rate.classList.add('details')
        rate.classList.add('details-rate')
        rate.innerText = `Tariffa: ${pass.rate}`
        details_right.appendChild(rate)

        const price = document.createElement('p')
        price.classList.add('details')
        price.classList.add('details-price')
        price.innerText = `Importo: ${pass.price} €`
        details_right.appendChild(price)

        const pass_number = document.createElement('p')
        pass_number.classList.add('details')
        pass_number.classList.add('details-number')
        pass_number.innerText = `Nº titolo: ${i}`
        details_right.appendChild(pass_number)

        details_container.appendChild(details_right)

        container.appendChild(details_container)
        //

    const holder_name = document.createElement('p')
    holder_name.classList.add('holder-name')
    holder_name.innerText = `${card.holder.firstName} ${card.holder.lastName}`
    container.appendChild(holder_name)

    const holder_taxID = document.createElement('p')
    holder_taxID.classList.add('holder-taxID')
    holder_taxID.innerText = `${card.holder.TAXID}`
    container.appendChild(holder_taxID)

    const qrcode_block = document.createElement('div')
    qrcode_block.id = `pass-card-qrcode-${crypto.randomUUID()}`
    qrcode_block.classList.add('qrcode')
    container.appendChild(qrcode_block)

    const qrURL = `https://awman3703.github.io/our-star-mobility/passVerification.html?${passDataToURLParameters({
        card_number: card.number,
        holder: {
            name: card.holder.firstName,
            last_name: card.holder.lastName
        },
        pass_type: pass.type,
        pass_activation: pass.activation,
        pass_expiry: pass.expiry,
        pass_from: pass.from,
        pass_to: pass.to,
        pass_variant: 'VARIANTE BASE',
        pass_price: pass.price,
        pass_purchase: pass.purchase,
        photo_dataURL: card.photoDataURL
    })}`
    shortenURL(qrURL, response => {
        console.log('Compressed pass #', i, 'URL to', response.short_url)
        // @ts-ignore
        const qrcode = new QRCode(qrcode_block, {
            text: response.short_url,
            width: 215,
            height: 215,
            colorDark : '#000',
            colorLight : '#fff'
        });
    })

    const info = document.createElement('p')
    info.classList.add('info')
    info.innerHTML = 'STAR Mobility S.p.A.<br>Viale Italia, 100 26900 Lodi C.F. e P.Iva 01927790186'
    container.appendChild(info)

    return container
}

function _new_passCard_dot(i: number) {
    const dot = document.createElement('div')
    dot.classList.add('pass-card-dot')
    dot.id = `pass-card-dot-${i}`
    dot.dataset.index = String(i)
    return dot
}

function _new_passCardSelector_item(card:IDCard, i:number) {
    const cardPasses = getCardPasses(card)

    const container = document.createElement('div')
    container.classList.add('item')
    container.dataset.cardIndex = String(i)
    container.addEventListener('click', e => {
        console.log('Switching to IDCard #', i)
        selectIDCard(i)
    })

    const cardNumber = document.createElement('span')
    cardNumber.classList.add('card-number')
    cardNumber.innerText = `${card.number}`
    container.appendChild(cardNumber)

    const holderName = document.createElement('p')
    holderName.classList.add('holder-name')
    holderName.innerText = `${card.holder.firstName} ${card.holder.lastName}`
    container.appendChild(holderName)

    const description = document.createElement('span')
    description.classList.add('description')
    const sin_plu = cardPasses.length!==1?'i':'o'
    description.innerHTML =
        `<span class="pass-counter">${cardPasses.length}</span>`
        + ` titol${sin_plu} di viaggio associat${sin_plu}`
    container.appendChild(description)

    return container
}


function refresh_passes() {
    const carousel = document.getElementById('pass-cards-carousel')
    const dots = document.getElementById('pass-cards-dots')
    // @ts-ignore
    carousel.innerHTML = ''
    // @ts-ignore
    dots.innerHTML = ''

    let counter:number = 0
    CURRENT_IDCARD_PASSES.forEach(pass => {
        // @ts-ignore
        carousel.appendChild(_new_passCard(getCurrentCard(), pass, counter + 1))
        // @ts-ignore
        dots.appendChild(_new_passCard_dot(counter + 1))
        counter += 1
    })
}

function updateCarouselDots() {
    // @ts-ignore
    const scrollDistance = passCard_carousel.scrollLeft
    // @ts-ignore
    const cardsWidth = document.querySelector('.pass-card').getBoundingClientRect().width

    // Get the index of the card that's currently being viewed
    const scrollIndex = Math.round(scrollDistance / cardsWidth) + 1

    const activeDot = document.querySelector('.pass-card-dot.active')
    if (activeDot) activeDot.classList.remove('active')
    // @ts-ignore
    document.getElementById(`pass-card-dot-${scrollIndex}`).classList.add('active')
}

function selectIDCard(index: number) {
    CURRENT_IDCARD_INDEX = index
    CURRENT_IDCARD_PASSES = getCardPasses(IDCARDS[index])
    console.log(`Current IDCard has ${CURRENT_IDCARD_PASSES.length} passes`)
    refresh_passes()
}

// SCRIPT

// @ts-ignore
passCard_carousel.addEventListener('scroll', updateCarouselDots)

if (IDCARDS.length < 1) {
    console.warn('No IDCard detected, redirecting to addIDCard...')
    redirect('addIDCard.html')
} else {
    console.info(`${IDCARDS.length} IDCard(s) found`)
}

let counter = 0
IDCARDS.forEach(card => {
    // @ts-ignore
    cardSelector.appendChild(_new_passCardSelector_item(card, counter))
    counter += 1
})

// Do this so everything gets properly loaded
selectIDCard(0)

// @ts-ignore
cardSelector_button.addEventListener('click', _ => {cardSelector_drawer.classList.add('open')})
// @ts-ignore
cardSelector_level.addEventListener('click', _ => {cardSelector_drawer.classList.remove('open')})

// Add redirection buttons
// @ts-ignore
document.getElementById('IDCard-add-button').addEventListener('click', _ => {redirect('addIDCard.html')})
// @ts-ignore
document.getElementById('TravelPass-add-button').addEventListener('click', _ => {redirect('addTravelPass.html')})


// Update pass cards every second because for some fucking reason they decided to put a live clock on them
function updateClocks() {
    const now = new Date()
    const clocks = document.getElementsByClassName('real-time-clock')
    for (const clock of clocks) {
        clock.innerHTML = `${prettyDate(now)} ${prettyTime(now, true)}`
    }
}
setInterval(updateClocks, 1000)