export function indexOf(string, context) {
    return context.indexOf(string);
}

export function encode(value) {
    return encodeURIComponent(value);
}

export function decode(value) {
    return decodeURIComponent(value);
}
