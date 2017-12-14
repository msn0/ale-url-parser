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
    let domainStartIndex = 0;
    let domainEndIndex = 0;
    const urlLength = url.length;
    const questionMarkIndex = url.indexOf('?');
    const queryStartIndex = questionMarkIndex ? urlLength : questionMarkIndex;
    const doubleSlashIndex = url.indexOf('//');

    if (doubleSlashIndex === -1) {
        const slashIndex = url.indexOf('/');
        domainEndIndex = slashIndex === -1 ? url.length : slashIndex;
    } else {
        domainStartIndex = doubleSlashIndex + 2;
        const slashIndex = url.indexOf('/', domainStartIndex);
        domainEndIndex = slashIndex === -1 ? url.length : slashIndex;
    }

    return [
        url.substring(domainStartIndex, domainEndIndex),
        url.substring(domainEndIndex, queryStartIndex).split('/').filter(p => p)
    ];
}

function getQueryParams(queryString) {
    return queryString.split('&').map(q => {
        const param = q.split('=');
        const name = param[0];
        const value = param[1] ? decodeURIComponent(param[1]) : '';
        return { name, value };
    });
}

function getQueryAndHash(url) {
    const source = url.split('?')[1];
    const queryAndHash = [];

    if (!source) {
        queryAndHash.push([], '');
    } else if (source.indexOf('#') === -1) {
        queryAndHash.push(getQueryParams(source), '');
    } else {
        const [ queryString, hash ] = source.split('#');
        queryAndHash.push(getQueryParams(queryString), hash);
    }

    return queryAndHash;
}

module.exports.parse = function(url) {
    const protocol = getProtocol(url);
    const [ host, path ] = getHostAndPath(url);
    const [ query, hash ] = getQueryAndHash(url);

    return { protocol, host, path, query, hash };
};
