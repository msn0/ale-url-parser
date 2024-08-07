import { encode } from './utils';

export function stringify(
    { protocol = 'http', host = '', path = [], query = {}, hash },
    options = {}
) {
    let result = '';

    if (host) {
        if (protocol === '') {
            result += '//';
        } else {
            result += protocol + '://';
        }

        result += host;
    }

    if (path.length > 0) {
        result += '/' + path.join('/');
    }

    const keys = Object.keys(query);
    if (keys.length > 0) {
        if (options.compareFunction) {
            keys.sort(options.compareFunction);
        }
        const queryString = keys
            .filter((k) => query[k] !== undefined)
            .map((key) => {
                const encodedKey = encode(key);
                if (Array.isArray(query[key])) {
                    return query[key]
                        .map((value) => `${encodedKey}=${encode(value)}`)
                        .join('&');
                } else if (query[key] === null) {
                    return `${encodedKey}`;
                }
                return `${encodedKey}=${encode(query[key])}`;
            })
            .join('&');

        result += '?' + queryString;
    }

    if (hash) {
        result += '#' + hash;
    }

    return result;
}
