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

    static FromJSON(json:{
        firstName: string
        lastName: string
        birthDate: Date
        TAXID: string
    }) {
        return new Human(
            json.firstName,
            json.lastName,
            json.birthDate,
            json.TAXID
        )
    }
    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            TAXID: this.TAXID
        }
    }
}

export class IDCard {
    // TAXID = codice fiscale
    constructor(card_number: string, holder: Human, photoDataURL: string) {
        this.number = card_number
        this.holder = holder
        this.photoDataURL = photoDataURL
    }
    number: string
    holder: Human
    photoDataURL: string

    static FromJSON(json:{
        number: string
        holder: Human
        photoDataURL: string
    }) {
        return new IDCard(
            json.number,
            Human.FromJSON(json.holder),
            json.photoDataURL
        )
    }
    toJSON() {
        return {
            number: this.number,
            holder: this.holder.toJSON(),
            photoDataURL: this.photoDataURL
        }
    }
}

export class TravelPass {
    constructor(from: string, to: string, line: string, type: string, period: string, price: number, rate: string, purchase: Date, expiry: Date, service: string, qrcodeDataURL: string) {
        this.from = from
        this.to = to
        this.line = line
        this.type = type
        this.period = period
        this.price = price
        this.rate = rate
        this.purchase = purchase
        this.expiry = expiry
        this.service = service
        this.qrcodeDataURL = qrcodeDataURL

    }
    // boarding
    from: string
    // destination
    to: string
    // line number (e.g. s007)
    line: string
    // pass type (e.g. monthly)
    type: string
    // validity period (e.g. august 2024)
    period: string
    // price in euros (e.g. 44.95)
    price: number
    // rate (tariffa, e.g. 003)
    rate: string
    // purchase date & time
    purchase: Date
    // expiry date & time
    expiry: Date
    // service (e.g. extraurbano Lodi)
    service: string
    // qrcode object blob
    qrcodeDataURL: string

    static FromJSON(json:{
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
        qrcodeDataURL: string
    }) {
        return new TravelPass(
            json.from,
            json.to,
            json.line,
            json.type,
            json.period,
            json.price,
            json.rate,
            new Date(json.purchase),
            new Date(json.expiry),
            json.service,
            json.qrcodeDataURL
        )
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
        }
    }
}