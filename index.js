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

function parse(url) {
    const [ host, path ] = getHostAndPath(url);
    const source = url.split('?');

    const query = source[1] ? source[1].split('&').map(q => ({
        name: q.split('=')[0],
        value: q.split('=')[1]
    })) : [];

    return {
        protocol: getProtocol(url),
        host,
        path,
        query
    };
}

function stringify(object) {
    let resultString = '';

    //TODO: dopisać test na http:
    object.protocol.indexOf(':') > -1 ? resultString = `${object.protocol}` : resultString = `${object.protocol}:`;
    resultString += `//${object.host}`;

    object.path && object.path.map(p => resultString += `/${p}`);
    resultString += '?';

    object.query && object.query.map(q => resultString += `${q.name}=${q.value}&`);
    resultString = resultString.slice(0, -1);

    return resultString;
}

module.exports = { parse, stringify };
