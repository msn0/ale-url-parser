'use strict';

function parse(url) {
    const source = url.split('?'),
        domainAndPath = source[0].split(/\/[^/]/);

    return {
        host: source[0],
        path: [],
        query: source[1] || []
    };
}

module.exports.parse = parse;
