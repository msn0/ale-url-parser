import { parseQuery } from './parse-query';

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

function getQueryAndHash(url) {
    // https://jsperf.com/split-vs-indexof-question-mark-match
    const indexOfQuestionSign = url.indexOf('?');
    const source = indexOfQuestionSign !== -1 && url.slice(indexOfQuestionSign + 1);

    if (!source) {
        return [ {} ];
    } else if (source.indexOf('#') === -1) {
        return [ parseQuery(source) ];
    } else {
        const [ queryString, hash ] = source.split('#');
        return [ parseQuery(queryString), hash ];
    }
}

export function parse(url) {
    const protocol = getProtocol(url);
    const [ host, path ] = getHostAndPath(url);
    const [ query, hash ] = getQueryAndHash(url);
    const result = { protocol, host, path };

    if (hash) {
        result.hash = hash;
    }

    if (Object.keys(query).length) {
        result.query = query;
    }

    return result;
}
