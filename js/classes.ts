// CLASSES

import {passDataToURLParameters} from "./utility.js";
import {shortenURL} from "./shortenURL.js";

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

// The page that validates passes, (parameters will later be appended to it to tell it what data to display)
export const baseTravelPassValidationUrl = 'https://awman3703.github.io/our-star-mobility/passVerification.html'

export class TravelPass {
    constructor(card: IDCard | null, from: string, to: string, line: string, type: string, period: string, price: number, rate: string, purchase: Date, activation: Date, expiry: Date, service: string, cardcolor: string, validationurl: string | null) {
        this.from = from
        this.to = to
        this.line = line
        this.type = type
        this.period = period
        this.price = price
        this.rate = rate
        this.purchase = purchase
        this.activation = activation
        this.expiry = expiry
        this.service = service
        this.cardcolor = cardcolor
        this.validationurl = validationurl ? validationurl : ""

        // If there is a card, generate/update the validation url based on it
        if (card && !validationurl) {
            // Create and shorten a validation url, so the API doesn't need to be called every time the pass is displayed
            this.validationurl = baseTravelPassValidationUrl // Set to this until the API responds
            // Compute the actual validation URL
            let trueValidationUrl = `${baseTravelPassValidationUrl}?${passDataToURLParameters({
                card_number: card.number,
                holder: {
                    name: card.holder.firstName,
                    last_name: card.holder.lastName
                },
                pass_type: this.type,
                pass_activation: this.activation,
                pass_expiry: this.expiry,
                pass_from: this.from,
                pass_to: this.to,
                pass_variant: 'VARIANTE BASE', // I don't really know what this means
                pass_price: this.price,
                pass_purchase: this.purchase,
                photo_dataURL: card.photoDataURL
            })}`
            trueValidationUrl = encodeURIComponent(trueValidationUrl)
            // Shorten the true validation URL, then set this.validationurl to the result
            shortenURL(trueValidationUrl, response => {
                this.validationurl = response.short_url
            })
        }

        // If we have no card, but there already is a validation url, the pass is complete
        if (validationurl) { return }

        // If there's neither... whoops
        else if (!card && !validationurl) {
            console.error("Created TravelPass with no validation URL. Please provide an URL or an IDCard")
        }
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
    // activation date and time (when the pass becomes valid)
    activation: Date
    // expiry date & time
    expiry: Date
    // service (e.g. extraurbano Lodi)
    service: string
    // Color for the pass card
    cardcolor: string
    // URL to validate this pass
    validationurl: string

    static FromJSON(json:{
        from: string
        to: string
        line: string
        type: string
        period: string
        price: number
        rate: string
        purchase: string
        activation: string
        expiry: string
        service: string
        cardcolor: string
        validationurl: string
    }) {
        return new TravelPass(
            null, // Since we already have a validation URL
            json.from,
            json.to,
            json.line,
            json.type,
            json.period,
            json.price,
            json.rate,
            new Date(json.purchase),
            new Date(json.activation),
            new Date(json.expiry),
            json.service,
            json.cardcolor,
            json.validationurl
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
            activation: this.activation.toJSON(),
            expiry: this.expiry.toJSON(),
            service: this.service,
            cardcolor: this.cardcolor,
            validationurl: this.validationurl
        }
    }
}