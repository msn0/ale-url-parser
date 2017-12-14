'use strict';

module.exports.stringify = function(object) {

    const result = [];

    if (object.protocol === '') {
        result.push('//');
    } else {
        result.push(object.protocol, '://');
    }

    result.push(object.host);

    if (object.path.length > 0) {
        result.push('/', object.path.join('/'));
    }

    if (object.query.length > 0) {
        const queryString = object.query.map(({ name, value }) => {
            if (value) {
                return `${name}=${value}`;
            }
            return name;
        }).join('&');
        result.push('?', queryString);
    }

    return result.join('');
};
