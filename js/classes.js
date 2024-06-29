// CLASSES
export class Human {
    constructor(firstName, lastName, birthDate, TAXID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.TAXID = TAXID;
    }
    static FromJSON(json) {
        return new Human(json.firstName, json.lastName, json.birthDate, json.TAXID);
    }
    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            TAXID: this.TAXID
        };
    }
}
export class IDCard {
    // TAXID = codice fiscale
    constructor(card_number, holder, photoDataURL) {
        this.number = card_number;
        this.holder = holder;
        this.photoDataURL = photoDataURL;
    }
    static FromJSON(json) {
        return new IDCard(json.number, Human.FromJSON(json.holder), json.photoDataURL);
    }
    toJSON() {
        return {
            number: this.number,
            holder: this.holder.toJSON(),
            photoDataURL: this.photoDataURL
        };
    }
}
export class TravelPass {
    constructor(from, to, line, type, period, price, rate, purchase, expiry, service, qrcodeDataURL) {
        this.from = from;
        this.to = to;
        this.line = line;
        this.type = type;
        this.period = period;
        this.price = price;
        this.rate = rate;
        this.purchase = purchase;
        this.expiry = expiry;
        this.service = service;
        this.qrcodeDataURL = qrcodeDataURL;
    }
    static FromJSON(json) {
        return new TravelPass(json.from, json.to, json.line, json.type, json.period, json.price, json.rate, new Date(json.purchase), new Date(json.expiry), json.service, json.qrcodeDataURL);
    }
    toJSON() {
        return {
            from: this.from,
            to: this.to,
            line: this.line,
            type: this.type,
            period: this.period,
            price: this.price,
            rate: this.rate,
            purchase: this.purchase.toJSON(),
            expiry: this.expiry.toJSON(),
            service: this.service,
            qrcodeDataURL: this.qrcodeDataURL
        };
    }
}
