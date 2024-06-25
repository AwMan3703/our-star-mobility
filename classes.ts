// CLASSES

export class Human {
    constructor(firstName: string, lastName: string, birthDate: Date, TAXID: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.birthDate = birthDate
        this.TAXID = TAXID
    }
    firstName: string
    lastName: string
    birthDate: Date
    TAXID: string

    static fromJSON(json) {
        return new Human(
            json.firstName,
            json.lastName,
            json.birthDate,
            json.TAXID
        )
    }
    toJSON() {
        let json
        json.firstName = this.firstName
        json.lastName = this.lastName
        json.birthDate = this.birthDate
        json.TAXID = this.TAXID
        return json
    }
}

export class IDCard {
    // TAXID = codice fiscale
    constructor(card_number: string, holder: Human) {
        this.number = card_number
        this.holder = holder
    }
    number: string
    holder: Human

    static fromJSON(json) {
        return new IDCard(
            json.number,
            Human.fromJSON(json.holder)
        )
    }
    toJSON() {
        let json
        json.number = this.number
        json.holder = this.holder.toJSON()
        return json
    }
}

export class TravelPass {
    constructor(from: string, to: string, line: string, type: string, price: number, purchase: Date, expiry: Date, service: string) {
        this.from = from
        this.to = to
        this.line = line
        this.type = type
        this.price = price
        this.purchase = purchase
        this.expiry = expiry
        this.service = service
    }
    from: string
    to: string
    line: string
    type: string
    price: number
    purchase: Date
    expiry: Date
    service: string

    static fromJSON(json) {
        return new TravelPass(
            json.from,
            json.to,
            json.line,
            json.type,
            json.price,
            new Date(json.purchase),
            new Date(json.expiry),
            json.service
        )
    }
    toJSON() {
        let json
        json.from = this.from
        json.to = this.to
        json.line = this.line
        json.type = this.type
        json.price = this.price
        json.purchase = this.purchase.toJSON()
        json.expiry = this.expiry.toJSON()
        json.service = this.service
        return json
    }
}

export default null