'use strict';

module.exports.stringify = function(object) {
    let resultString = '';

    //TODO: dopisać test na http:
    object.protocol.indexOf(':') > -1 ? resultString = `${object.protocol}` : resultString = `${object.protocol}:`;
    resultString += `//${object.host}`;

    object.path && object.path.map(p => resultString += `/${p}`);
    resultString += '?';

    object.query && object.query.map(q => resultString += `${q.name}=${q.value}&`);
    resultString = resultString.slice(0, -1);

    return resultString;
};
