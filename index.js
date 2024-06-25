"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CURRENT_IDCARD = null;
const CURRENT_IDCARD_PASSES = [];
// LOCALSTORAGE STUFF
const localStorageCardListKey = 'IDCards';
const localStorageCardDataKey = (card) => `${card.number}-TravelPasses`;
