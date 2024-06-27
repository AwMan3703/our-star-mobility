import { IDCard, TravelPass } from "./classes.js";
// LOCALSTORAGE STUFF
const localStorageCardListKey = 'IDCards';
export function getCards() {
    const cards = [];
    const JSONCards = JSON.parse(localStorage.getItem(localStorageCardListKey) || "[]");
    JSONCards.forEach((card) => {
        if (typeof card === typeof IDCard) {
            // @ts-ignore
            cards.push(new IDCard.FromJSON(card));
        }
    });
    return cards;
}
export function setCards(cards) {
    const JSONCards = [];
    cards.forEach((card) => { JSONCards.push(card.toJSON()); });
    localStorage.setItem(localStorageCardListKey, JSON.stringify(JSONCards));
}
const localStorageCardDataKey = (card) => `${card.number}-TravelPasses`;
export function getCardPasses(card) {
    const passes = [];
    const JSONPasses = JSON.parse(localStorage.getItem(localStorageCardDataKey(card)) || "[]");
    JSONPasses.forEach((pass) => {
        if (typeof pass === typeof TravelPass) {
            // @ts-ignore
            cards.push(new IDCard.FromJSON(card));
        }
    });
    return passes;
}
export function setCardPasses(card, passes) {
    const JSONPasses = [];
    passes.forEach((pass) => { JSONPasses.push(pass.toJSON()); });
    localStorage.setItem(localStorageCardDataKey(card), JSON.stringify(JSONPasses));
}
