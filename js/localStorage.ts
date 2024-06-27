import {IDCard, TravelPass} from "./classes.js";

// LOCALSTORAGE STUFF

const localStorageCardListKey: string = 'IDCards'
export function getCards() {
    const cards:IDCard[] = []
    const JSONCards = JSON.parse(localStorage.getItem(localStorageCardListKey) || "[]")
    JSONCards.forEach((card:{}|null) => {if (typeof card === typeof IDCard) {
        // @ts-ignore
        cards.push(new IDCard.FromJSON(card))
    }})
    return cards
}
export function setCards(cards:IDCard[]) {
    const JSONCards:{}[] = []
    cards.forEach((card:IDCard) => {JSONCards.push(card.toJSON())})
    localStorage.setItem(localStorageCardListKey, JSON.stringify(JSONCards))
}

const localStorageCardDataKey = (card:IDCard) => `${card.number}-TravelPasses`
export function getCardPasses(card:IDCard) {
    const passes:TravelPass[] = []
    const JSONPasses = JSON.parse(localStorage.getItem(localStorageCardDataKey(card)) || "[]")
    JSONPasses.forEach((pass:{}|null) => {if (typeof pass === typeof TravelPass) {
        // @ts-ignore
        cards.push(new IDCard.FromJSON(card))
    }})
    return passes
}
export function setCardPasses(card:IDCard, passes:TravelPass[]) {
    const JSONPasses:{}[] = []
    passes.forEach((pass:TravelPass) => {JSONPasses.push(pass.toJSON())})
    localStorage.setItem(localStorageCardDataKey(card), JSON.stringify(JSONPasses))
}