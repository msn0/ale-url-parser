import { encode, decode } from './utils';

export function stringify({ protocol = 'http', host = '', path = [], query = {}, hash }, options = {}) {
    const result = [];

    if (host) {
        if (protocol === '') {
            result.push('//');
        } else {
            result.push(protocol, '://');
        }

        result.push(host);
    }

    if (path.length > 0) {
        result.push('/', path.join('/'));
    }

    if (Object.keys(query).length > 0) {
        const queryString = Object.keys(query)
            .sort(options.compareFunction || function () { })
            .map(key => {
                if (Array.isArray(query[key])) {
                    return query[key].map(value => `${encode(key)}=${encode(value)}`).join('&');
                } else if (query[key]) {
                    return `${encode(key)}=${encode(query[key])}`;
                }
                return encode(decode(key));
            })
            .join('&');

        result.push('?', queryString);
    }

    if (hash) {
        result.push('#' + hash);
    }

    return result.join('');
}
