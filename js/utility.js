// UTILITY FUNCTIONS
export const redirect = (location) => { window.location.replace(location); };
export function capitalize(text) {
    return text[0].toUpperCase() + text.substring(1, text.length);
}
