// UTILITY FUNCTIONS

export const redirect = (location: string | URL) => { // @ts-ignore
    window.location.href = location }

export function toggleClass(element: HTMLElement, className: string) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

export function capitalize(text: string) {
    return text[0].toUpperCase() + text.substring(1, text.length)}

const fillZeros = (n: number, expected_length: number) => {
    const nsl = String(n).length
    if (nsl < expected_length) return '0'.repeat(expected_length - nsl) + n
    else return n
}

export function prettyDate(date: Date) {
    return ''+
        `${fillZeros(date.getDate(), 2)}/`+
        `${fillZeros(date.getMonth() + 1, 2)}/`+
        `${date.getFullYear()}`
}

export function prettyTime(date: Date, seconds: boolean) {
    return ''+
        `${fillZeros(date.getHours(), 2)}:`+
        `${fillZeros(date.getMinutes(), 2)}`+
        `${seconds ? (`:${fillZeros(date.getSeconds(), 2)}`) : ''}`
}

export function prettyPrice(price: number) {
    const dec = String(price).split('.')[1]
    return dec && dec.length > 0 ? String(price.toFixed(2)) : price + '.0'
}

export function passDataToURLParameters(data: {
    card_number: string,
    holder: {
        name: string,
        last_name: string
    },
    pass_type: string,
    pass_activation: Date,
    pass_expiry: Date,
    pass_from: string,
    pass_to: string,
    pass_variant: string,
    pass_price: number,
    pass_purchase: Date,
    photo_dataURL: string
}) {
    //concatenate url parameter
    const c = (s: string, k: string, v:string) => {
        return `${s}&${k}=${v}`
    }

    let raw = 'cn=' + data.card_number
    raw = c(raw, 'hn', data.holder.name)
    raw = c(raw, 'hln', data.holder.last_name)
    raw = c(raw, 'pty', data.pass_type)
    raw = c(raw, 'pvd', `${prettyDate(data.pass_activation)} - ${prettyDate(data.pass_expiry)}`)
    raw = c(raw, 'pf', data.pass_from)
    raw = c(raw, 'pt', data.pass_to)
    raw = c(raw, 'pv', data.pass_variant)
    raw = c(raw, 'ppr', String(data.pass_price))
    raw = c(raw, 'pp', prettyDate(data.pass_purchase))
    //raw = c(raw, 'pic', data.photo_dataURL) // skip this as it would make a 2000+ character URL

    return encodeURIComponent(raw)
}

export function passDataFromURL(search: string) {
    const URLParameters = new URLSearchParams(search)

    return {
        card_number: URLParameters.get('cn') || 'N/A',
        holder: {
            name: URLParameters.get('hn') || 'N/A',
            last_name: URLParameters.get('hln') || 'N/A'
        },
        pass_type: URLParameters.get('pty') || 'N/A',
        pass_validity: URLParameters.get('pvd') || 'N/A',
        pass_from: URLParameters.get('pf') || 'N/A',
        pass_to: URLParameters.get('pt') || 'N/A',
        pass_variant: URLParameters.get('pv') || 'N/A',
        pass_price: URLParameters.get('ppr') || 'N/A',
        pass_purchase: URLParameters.get('pp') || 'N/A',
        photo_dataURL: URLParameters.get('pic') || 'N/A',
    };
}
