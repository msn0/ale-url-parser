'use strict';

function encode(value) {
    return encodeURIComponent(value);
}

module.exports.stringify = function ({ protocol = 'http', host = '', path = [], query = {}, hash = '' }, options = {}) {
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
                    return query[key].map(value => `${key}=${encode(value)}`).join('&');
                } else if (query[key]) {
                    return `${key}=${encode(query[key])}`;
                }
                return key;
            })
            .join('&');

        result.push('?', queryString);
    }

    if (hash) {
        result.push('#' + hash);
    }

    return result.join('');
};
