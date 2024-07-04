import { IDCard, TravelPass } from "./classes.js";
// LOCALSTORAGE STUFF
const localStorageCardListKey = 'IDCards';
export function getCards() {
    const cards = [];
    const JSONCards = JSON.parse(localStorage.getItem(localStorageCardListKey) || "[]");
    JSONCards.forEach((card) => {
        // @ts-ignore
        cards.push(IDCard.FromJSON(card));
    });
    return cards;
}
export function setCards(cards) {
    const JSONCards = [];
    cards.forEach((card) => { JSONCards.push(card.toJSON()); });
    localStorage.setItem(localStorageCardListKey, JSON.stringify(JSONCards));
}
const localStorageCardPassesKey = (card) => `${card.number}-TravelPasses`;
export function getCardPasses(card) {
    const passes = [];
    if (typeof card === typeof undefined || !card)
        return passes;
    const JSONPasses = JSON.parse(localStorage.getItem(localStorageCardPassesKey(card)) || "[]");
    JSONPasses.forEach((pass) => {
        // @ts-ignore
        passes.push(TravelPass.FromJSON(pass));
    });
    return passes;
}
export function setCardPasses(card, passes) {
    const JSONPasses = [];
    passes.forEach((pass) => { JSONPasses.push(pass.toJSON()); });
    localStorage.setItem(localStorageCardPassesKey(card), JSON.stringify(JSONPasses));
}
