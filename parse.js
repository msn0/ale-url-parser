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
    // TODO: compare with https://url.spec.whatwg.org/#concept-url-parser
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
    // https://jsperf.com/split-vs-indexof-question-mark-match
    const indexOfQuestionSign = url.indexOf('?');
    const source = indexOfQuestionSign !== -1 && url.slice(indexOfQuestionSign + 1);

    if (!source) {
        return [ {}, '' ];
    } else if (source.indexOf('#') === -1) {
        return [ getQueryParams(source) ];
    } else {
        const [ queryString, hash ] = source.split('#');
        return [ getQueryParams(queryString), hash ];
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
