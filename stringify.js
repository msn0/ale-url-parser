'use strict';

module.exports.stringify = function({ protocol, host, path, query, hash }) {
    const result = [];

    if (protocol === '') {
        result.push('//');
    } else {
        result.push(protocol, '://');
    }

    result.push(host);

    if (path.length > 0) {
        result.push('/', path.join('/'));
    }

    if (Object.keys(query).length > 0) {
        const queryString = Object.keys(query).map(key => {
            if (query[key]) {
                return `${key}=${query[key]}`;
            }
            return key;
        }).join('&');
        result.push('?', queryString);
    }

    if (hash) {
        result.push('#' + hash);
    }

    return result.join('');
};
