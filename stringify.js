'use strict';

const allowedReservedQueryValues = {
    '%2F': '/',
    '%3A': ':',
    '%3D': '=',
    '%3F': '?',
    '%40': '@',
    '%24': '$',
    '%2B': '+',
    '%2C': ',',
    '%3B': ';'
};

const allowedReservedRegExp = new RegExp(Object.keys(allowedReservedQueryValues).join('|'), 'gi');

function allowReserved(value) {
    Object.keys(allowedReservedQueryValues).forEach(key => {
        value = value.replace(allowedReservedRegExp, allowedReservedQueryValues[key]);
    });

    return value;
}

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
                    return query[key].map(value => {
                        return `${encode(key)}=${allowReserved(encode(value))}`;
                    }).join('&');
                } else if (query[key]) {
                    return `${encode(key)}=${allowReserved(encode(query[key]))}`;
                }
                return encode(key);
            })
            .join('&');

        result.push('?', queryString);
    }

    if (hash) {
        result.push('#' + hash);
    }

    return result.join('');
};
