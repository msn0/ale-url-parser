import { parseQuery } from './parse-query';
import { indexOf } from './utils';

// https://jsperf.com/test-protocol-indexof-vs-regex
function getProtocol(url) {
    if (indexOf('//', url) === 0) {
        return '';
    } else if (indexOf('https://', url) === 0) {
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
    const indexOfQuestionSign = indexOf('?', url);
    const source = indexOfQuestionSign !== -1 && url.slice(indexOfQuestionSign + 1);

    if (!source) {
        return [ {}, '' ];
    }

    const indexOfHash = indexOf('#', source);
    if (indexOfHash === -1) {
        return [ parseQuery(source), '' ];
    }

    const queryString = source.slice(0, indexOfHash);
    const hash = source.slice(indexOfHash + 1);
    return [
        parseQuery(queryString),
        hash
    ];
}

export function parse(url) {
    const protocol = getProtocol(url);
    const [ host, path ] = getHostAndPath(url);
    const [ query, hash ] = getQueryAndHash(url);
    const result = {
        protocol,
        host,
        path,
        query,
        hash
    };

    return result;
}
