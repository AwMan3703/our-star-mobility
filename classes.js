"use strict";
// CLASSES
Object.defineProperty(exports, "__esModule", { value: true });
exports.TravelPass = exports.IDCard = exports.Human = void 0;
class Human {
    constructor(firstName, lastName, birthDate, TAXID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.TAXID = TAXID;
    }
    static fromJSON(json) {
        return new Human(json.firstName, json.lastName, json.birthDate, json.TAXID);
    }
    toJSON() {
        let json;
        json.firstName = this.firstName;
        json.lastName = this.lastName;
        json.birthDate = this.birthDate;
        json.TAXID = this.TAXID;
        return json;
    }
}
exports.Human = Human;
class IDCard {
    // TAXID = codice fiscale
    constructor(card_number, holder) {
        this.number = card_number;
        this.holder = holder;
    }
    static fromJSON(json) {
        return new IDCard(json.number, Human.fromJSON(json.holder));
    }
    toJSON() {
        let json;
        json.number = this.number;
        json.holder = this.holder.toJSON();
        return json;
    }
}
exports.IDCard = IDCard;
class TravelPass {
    constructor(from, to, line, type, price, purchase, expiry, service) {
        this.from = from;
        this.to = to;
        this.line = line;
        this.type = type;
        this.price = price;
        this.purchase = purchase;
        this.expiry = expiry;
        this.service = service;
    }
    static fromJSON(json) {
        return new TravelPass(json.from, json.to, json.line, json.type, json.price, new Date(json.purchase), new Date(json.expiry), json.service);
    }
    toJSON() {
        let json;
        json.from = this.from;
        json.to = this.to;
        json.line = this.line;
        json.type = this.type;
        json.price = this.price;
        json.purchase = this.purchase.toJSON();
        json.expiry = this.expiry.toJSON();
        json.service = this.service;
        return json;
    }
}
exports.TravelPass = TravelPass;
exports.default = null;
