'use strict';

function parse(url) {
    const source = url.split('?');
    const protocolHostPath = source[0].split(/\/\//);
    const protocol = protocolHostPath[0].slice(0, -1) || '';
    const hostPath = protocolHostPath[1].split(/\/(.+)/);
    const host = hostPath[0] || '';
    const path = hostPath[1] ? hostPath[1].split('/').filter(p => p.length) : [];
    const query = source[1] ? source[1].split('&').map(q => ({
        name: q.split('=')[0],
        value: q.split('=')[1],
    })) : [];

    return {
        protocol,
        host,
        path,
        query
    };
}

function stringify(object) {
    let resultString = '';

    resultString = `${object.protocol}://${object.host}`;
    
    object.path && object.path.map(p => resultString += `/${p}`);
    resultString += '?'

    object.query && object.query.map(q => resultString += `${q.name}=${q.value}&`);
    resultString = resultString.slice(0, -1);

    return resultString;
}

module.exports = { parse, stringify };
