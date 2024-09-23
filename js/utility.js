// UTILITY FUNCTIONS
export const redirect = (location) => {
    window.location.href = location;
};
export function toggleClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
    else {
        element.classList.add(className);
    }
}
export function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1, text.length);
}
const fillZeros = (n, expected_length) => {
    const nsl = String(n).length;
    if (nsl < expected_length)
        return '0'.repeat(expected_length - nsl) + n;
    else
        return n;
};
export function prettyDate(date) {
    return '' +
        `${fillZeros(date.getDate(), 2)}/` +
        `${fillZeros(date.getMonth() + 1, 2)}/` +
        `${date.getFullYear()}`;
}
export function prettyTime(date, seconds) {
    return '' +
        `${fillZeros(date.getHours(), 2)}:` +
        `${fillZeros(date.getMinutes(), 2)}` +
        `${seconds ? (`:${fillZeros(date.getSeconds(), 2)}`) : ''}`;
}
export function prettyPrice(price) {
    const dec = String(price).split('.')[1];
    return dec && dec.length > 0 ? String(price.toFixed(2)) : price + '.0';
}
export function passDataToURLParameters(data) {
    //concatenate url parameter
    const c = (s, k, v) => {
        return `${s}&${k}=${v}`;
    };
    let params = 'cn=' + data.card_number;
    params = c(params, 'hn', data.holder.name);
    params = c(params, 'hln', data.holder.last_name);
    params = c(params, 'pty', data.pass_type);
    params = c(params, 'pvd', `${prettyDate(data.pass_activation)} - ${prettyDate(data.pass_expiry)}`);
    params = c(params, 'pf', data.pass_from);
    params = c(params, 'pt', data.pass_to);
    params = c(params, 'pv', data.pass_variant);
    params = c(params, 'ppr', String(data.pass_price));
    params = c(params, 'pp', prettyDate(data.pass_purchase));
    //params = c(params, 'pic', data.photo_dataURL) // skip this as it would make a 2000+ character URL
    return params;
}
export function passDataFromURL(search) {
    const URLParameters = new URLSearchParams(search);
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
        photo_dataURL: URLParameters.get('pic') || '-',
    };
}
