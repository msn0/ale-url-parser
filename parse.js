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

// https://jsperf.com/domain-path-parse-indexof-vs-regex
function getHostAndPath(url) {
    const match = /([^/]*:?\/\/)?([^/^?]*)([^?]*)?/.exec(url);

    if (match) {
        const host = match[2];
        const path = match[3] ? match[3].split('/').filter(p => p) : [];

        return [ host, path ];
    }
}

function getQueryParams(queryString) {
    return queryString
        .split('&')
        .reduce((acc, next) => {
            const indexOfEqualsSign = next.indexOf('=');
            const param = [];
            if (indexOfEqualsSign !== -1) {
                param.push(next.substr(0, indexOfEqualsSign), next.substr(indexOfEqualsSign + 1));
            } else {
                param.push(next);
            }

            const name = decodeURIComponent(param[0]);
            const value = param[1] ? decodeURIComponent(param[1]) : '';
            if (Array.isArray(acc[name])) {
                acc[name].push(value);
            } else if (acc.hasOwnProperty(name)) {
                acc[name] = [ acc[name], value ];
            } else {
                acc[name] = value;
            }
            return acc;
        }, {});
}

function getQueryAndHash(url) {
    const source = url.split(/\?(.*)/)[1];
    const queryAndHash = [];

    if (!source) {
        queryAndHash.push({}, '');
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
