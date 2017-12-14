'use strict';

// https://jsperf.com/test-protocol-indexof-vs-regex
function getProtocol(url) {
    if (url.indexOf('//') === 0) {
        return '';
    } else if (url.indexOf('https://') === 0) {
        return 'https';
    }

    return 'http';
}

function getHostAndPath(url) {
    const match = /(.*:?\/\/)?([^/^?]*)([^?]*)?/.exec(url);

    if (match) {
        const host = match[2];
        const path = match[3] ? match[3].split('/').filter(p => p) : [];

        return [ host, path ];
    }
}

function getQuery(url) {
    const source = url.split('?');

    return source[1] ? source[1].split('&').map(q => ({
        name: q.split('=')[0],
        value: decodeURIComponent(q.split('=')[1])
    })) : [];
}

module.exports.parse = function(url) {
    const protocol = getProtocol(url);
    const [ host, path ] = getHostAndPath(url);
    const query = getQuery(url);

    return { protocol, host, path, query };
};
