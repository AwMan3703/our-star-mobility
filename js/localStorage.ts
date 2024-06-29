import {Human, IDCard, TravelPass} from "./classes.js";

// LOCALSTORAGE STUFF

const localStorageCardListKey: string = 'IDCards'
export function getCards() {
    const cards:IDCard[] = []
    const JSONCards = JSON.parse(localStorage.getItem(localStorageCardListKey) || "[]")
    JSONCards.forEach((card:{
        number: string
        holder: Human
        photoDataURL: string
    }) => {
        // @ts-ignore
        cards.push(IDCard.FromJSON(card))
    })
    return cards
}
export function setCards(cards:IDCard[]) {
    const JSONCards:{}[] = []
    cards.forEach((card:IDCard) => {JSONCards.push(card.toJSON())})
    localStorage.setItem(localStorageCardListKey, JSON.stringify(JSONCards))
}

const localStorageCardPassesKey = (card:IDCard) => `${card.number}-TravelPasses`
export function getCardPasses(card:IDCard) {
    const passes:TravelPass[] = []
    const JSONPasses = JSON.parse(localStorage.getItem(localStorageCardPassesKey(card)) || "[]")
    JSONPasses.forEach((pass:{
        from: string
        to: string
        line: string
        type: string
        period: string;
        price: number
        rate: string
        purchase: string
        expiry: string
        service: string
    }) => {
        // @ts-ignore
        passes.push(TravelPass.FromJSON(pass))
    })
    return passes
}
export function setCardPasses(card:IDCard, passes:TravelPass[]) {
    const JSONPasses:{}[] = []
    passes.forEach((pass:TravelPass) => {JSONPasses.push(pass.toJSON())})
    localStorage.setItem(localStorageCardPassesKey(card), JSON.stringify(JSONPasses))
}