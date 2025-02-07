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

export function fillZeros(n: string | number, expected_length: number, fill_before: boolean = false) {
    const nsl = String(n).length
    const filler = '0'.repeat(expected_length - nsl)
    if (nsl < expected_length) return fill_before ? filler + n : n + filler
    else return String(n)
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
    // concatenate url parameters
    const params = new URLSearchParams()
    params.set('cn', data.card_number)
    params.set('hn', data.holder.name)
    params.set('hln', data.holder.last_name)
    params.set('pty', data.pass_type)
    params.set('pvd', `${prettyDate(data.pass_activation)} - ${prettyDate(data.pass_expiry)}`)
    params.set('pf', data.pass_from)
    params.set('pt', data.pass_to)
    params.set('pv', data.pass_variant)
    params.set('ppr', String(data.pass_price))
    params.set('pp', prettyDate(data.pass_purchase))
    // params.set('pic', data.photo_dataURL) // skip this as it would make a 2000+ character URL, I have to figure it out soon

    return params.toString()
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
        // @ts-ignore
        pass_expiry: new Date(URLParameters.get('pvd').split('-')[1]) || 'N/A',
        pass_from: URLParameters.get('pf') || 'N/A',
        pass_to: URLParameters.get('pt') || 'N/A',
        pass_variant: URLParameters.get('pv') || 'N/A',
        pass_price: URLParameters.get('ppr') || 'N/A',
        pass_purchase: URLParameters.get('pp') || 'N/A',
        photo_dataURL: URLParameters.get('pic') || '-',
    };
}
