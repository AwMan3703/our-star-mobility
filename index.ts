import {Human, IDCard, TravelPass} from "./classes"

const CURRENT_IDCARD:IDCard|null = null
const CURRENT_IDCARD_PASSES = []


// LOCALSTORAGE STUFF

const localStorageCardListKey: string = 'IDCards'

const localStorageCardDataKey = (card:IDCard) => `${card.number}-TravelPasses`




