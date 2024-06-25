import {Human, IDCard, TravelPass} from "./classes.js"

let CURRENT_IDCARD_INDEX: number = 0
let IDCARDS:IDCard[] = []
let CURRENT_IDCARD_PASSES:TravelPass[] = []


// LOCALSTORAGE STUFF

const localStorageCardListKey: string = 'IDCards'
function getCards() {
    const cards:IDCard[] = []
    const JSONCards = JSON.parse(localStorage.getItem(localStorageCardListKey) || "[]")
    JSONCards.forEach((card:{}|null) => {if (typeof card === typeof IDCard) {
        // @ts-ignore
        cards.push(new IDCard.FromJSON(card))
    }})
    return cards
}
function setCards(cards:IDCard[]) {
    const JSONCards:{}[] = []
    cards.forEach((card:IDCard) => {JSONCards.push(card.toJSON())})
    localStorage.setItem(localStorageCardListKey, JSON.stringify(JSONCards))
}

const localStorageCardDataKey = (card:IDCard) => `${card.number}-TravelPasses`
function getCardPasses(card:IDCard) {
    const passes:TravelPass[] = []
    const JSONPasses = JSON.parse(localStorage.getItem(localStorageCardDataKey(card)) || "[]")
    JSONPasses.forEach((pass:{}|null) => {if (typeof pass === typeof TravelPass) {
        // @ts-ignore
        cards.push(new IDCard.FromJSON(card))
    }})
    return passes
}
function setCardPasses(card:IDCard, passes:TravelPass[]) {
    const JSONPasses:{}[] = []
    passes.forEach((pass:TravelPass) => {JSONPasses.push(pass.toJSON())})
    localStorage.setItem(localStorageCardDataKey(card), JSON.stringify(JSONPasses))
}

// UTILITY

function getCurrentCard() {
    return IDCARDS[CURRENT_IDCARD_INDEX]
}


// UI

function _new_passCard(card:IDCard, pass:TravelPass, pass_number:number):HTMLElement {
    const container = document.createElement('div')
    container.classList.add('pass-card-container')

    const logo = document.createElement('img')
    logo.classList.add('pass-card-logo')
    logo.src = '../src/logo_white.png'
    container.appendChild(logo)

    const validity_label = document.createElement('p')
    validity_label.classList.add('pass-card-validitylabel')
    validity_label.innerText = `abbonamento ${pass.expiry >= new Date() ? 'valido' : 'scaduto'}`
    container.appendChild(validity_label)

    const idcard_number = document.createElement('p')
    idcard_number.classList.add('pass-card-idcardnumber')
    idcard_number.innerText = `tessera nº ${card.number}`
    container.appendChild(idcard_number)

    const divider = document.createElement('hr')
    divider.classList.add('pass-card-divider')
    container.appendChild(divider)

    const route = document.createElement('p')
    route.classList.add('pass-card-route')
    route.innerHTML = `percorso<br>${pass.from}<br>${pass.to}`
    container.appendChild(route)

        // ID card
        const idcard_container = document.createElement('div')
        idcard_container.classList.add('pass-card-idcardcontainer')

            // ID card details
            const idcard_details_container = document.createElement('div')
            idcard_details_container.classList.add('pass-card-idcarddetailscontainer')

            const idcard_pass_type  = document.createElement('p')
            idcard_pass_type.classList.add('pass-card-idcarddetails')
            idcard_pass_type.classList.add('pass-card-idcardpasstype')
            idcard_pass_type.innerText = `${pass.type.replace(/ .*/,'')}`
            idcard_details_container.appendChild(idcard_pass_type)

            const idcard_pass_period  = document.createElement('p')
            idcard_pass_type.classList.add('pass-card-idcarddetails')
            idcard_pass_period.classList.add('pass-card-idcardpassperiod')
            idcard_pass_period.innerText = `${pass.period}`
            idcard_details_container.appendChild(idcard_pass_period)

            const idcard_pass_purchase_date  = document.createElement('p')
            idcard_pass_type.classList.add('pass-card-idcarddetails')
            idcard_pass_type.classList.add('pass-card-idcardpasspurchase')
            idcard_pass_purchase_date.classList.add('pass-card-idcardpasspurchase-date')
            idcard_pass_purchase_date.innerText = `${pass.purchase.getDate()}/${pass.purchase.getMonth() + 1}/${pass.purchase.getFullYear()}`
            idcard_details_container.appendChild(idcard_pass_purchase_date)

            const idcard_pass_purchase_time  = document.createElement('p')
            idcard_pass_type.classList.add('pass-card-idcarddetails')
            idcard_pass_type.classList.add('pass-card-idcardpasspurchase')
            idcard_pass_purchase_time.classList.add('pass-card-idcardpasspurchase-time')
            idcard_pass_purchase_time.innerText = `${pass.purchase.getHours()}:${pass.purchase.getMinutes()}:${pass.purchase.getSeconds()}`
            idcard_details_container.appendChild(idcard_pass_purchase_time)

            idcard_container.appendChild(idcard_details_container)
            //

        const idcard_photo = document.createElement('img')
        idcard_photo.classList.add('pass-card-idcardphoto')
        idcard_photo.src = card.photoDataURL
        idcard_container.appendChild(idcard_photo)

        const idcard_stripes = document.createElement('div')
        idcard_stripes.classList.add('pass-card-idcardstripes')
        idcard_container.appendChild(idcard_stripes)

        container.appendChild(idcard_container)
        //

    const service_type = document.createElement('p')


    return container
}

function refresh_passes() {
    const carousel:HTMLElement = document.getElementById('passes-carousel')
    carousel.innerHTML = ''
    let counter:number = 0
    CURRENT_IDCARD_PASSES.forEach(pass => {
        carousel.appendChild(_new_passCard(getCurrentCard(), pass, counter + 1))
        counter += 1
    })
}

function selectIDCard(index: number) {
    CURRENT_IDCARD_INDEX = index
    CURRENT_IDCARD_PASSES = getCardPasses(IDCARDS[index])
    refresh_passes()
}

// SCRIPT

if (getCards().length < 1) window.location.replace('addIDCard.html')

// Do this so everything gets properly loaded
selectIDCard(0)





