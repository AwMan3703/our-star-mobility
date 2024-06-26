// UTILITY FUNCTIONS

export const redirect = (location: string | URL) => { window.location.href = location }

export function capitalize(text: string) {
    return text[0].toUpperCase() + text.substring(1, text.length)}
