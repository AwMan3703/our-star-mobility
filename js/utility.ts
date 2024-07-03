// UTILITY FUNCTIONS

export const redirect = (location: string | URL) => { // @ts-ignore
    window.location.href = location }

export function capitalize(text: string) {
    return text[0].toUpperCase() + text.substring(1, text.length)}

export function prettyDate(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

export function prettyTime(date: Date, seconds: boolean) {
    return `${date.getHours()}:${date.getMinutes()}${seconds ? ':'+date.getSeconds() : ''}`
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
    pass_purchase: Date
}) {
    //concatenate url parameter
    const c = (s: string, k: string, v:string) => {
        return `${s}&${k}=${v}`
    }
    const raw = ''

    c(raw, 'cn', data.card_number)
    c(raw, 'hn', data.holder.name)
    c(raw, 'hln', data.holder.last_name)
    c(raw, 'pty', data.pass_type)
    c(raw, 'pvd', `${prettyDate(data.pass_activation)} - ${prettyDate(data.pass_expiry)}`)
    c(raw, 'pf', data.pass_from)
    c(raw, 'pt', data.pass_to)
    c(raw, 'pv', data.pass_variant)
    c(raw, 'ppr', String(data.pass_price))
    c(raw, 'pp', prettyDate(data.pass_purchase))

    return encodeURI(raw)
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
    };
}