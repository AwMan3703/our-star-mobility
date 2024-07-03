// UTILITY FUNCTIONS
export const redirect = (location) => {
    window.location.href = location;
};
export function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1, text.length);
}
export function prettyDate(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
export function prettyTime(date, seconds) {
    return `${date.getHours()}:${date.getMinutes()}${seconds ? ':' + date.getSeconds() : ''}`;
}
export function passDataToURLParameters(data) {
    //concatenate url parameter
    const c = (s, k, v) => {
        return `${s}&${k}=${v}`;
    };
    let raw = '';
    raw = c(raw, 'cn', data.card_number);
    raw = c(raw, 'hn', data.holder.name);
    raw = c(raw, 'hln', data.holder.last_name);
    raw = c(raw, 'pty', data.pass_type);
    raw = c(raw, 'pvd', `${prettyDate(data.pass_activation)} - ${prettyDate(data.pass_expiry)}`);
    raw = c(raw, 'pf', data.pass_from);
    raw = c(raw, 'pt', data.pass_to);
    raw = c(raw, 'pv', data.pass_variant);
    raw = c(raw, 'ppr', String(data.pass_price));
    raw = c(raw, 'pp', prettyDate(data.pass_purchase));
    return encodeURI(raw);
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
    };
}
