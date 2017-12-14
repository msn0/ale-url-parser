'use strict';

module.exports.stringify = function({ protocol, host, path, query }) {
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

    if (query.length > 0) {
        const queryString = query.map(({ name, value }) => {
            if (value) {
                return `${name}=${value}`;
            }
            return name;
        }).join('&');
        result.push('?', queryString);
    }

    return result.join('');
};
