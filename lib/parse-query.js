import { indexOf } from './utils';

function decode(component) {
    try {
        return decodeURIComponent(component);
    } catch (e) {
        return component;
    }
}

export function parseQuery (queryString) {
    // TODO: compare with https://url.spec.whatwg.org/#concept-url-parser
    const splitted = queryString.split('&');
    const acc = {};

    for (let i = 0; i < splitted.length; i++) {
        const next = splitted[i];
        const indexOfEqualsSign = indexOf('=', next);
        const param = [];
        if (indexOfEqualsSign !== -1) {
            param.push(next.substr(0, indexOfEqualsSign), next.substr(indexOfEqualsSign + 1));
        } else {
            param.push(next);
        }

        if (param[1] && indexOf('+', param[1]) > -1) {
            param[1] = param[1].replace(/\+/g, ' ');
        }

        const name = indexOf('%', param[0]) !== -1 ? decode(param[0]) : param[0];
        const value = param[1] ? (indexOf('%', param[1]) !== -1 ? decode(param[1]) : param[1]) : '';
        if (Array.isArray(acc[name])) {
            acc[name].push(value);
        } else if (acc.hasOwnProperty(name)) {
            acc[name] = [ acc[name], value ];
        } else {
            acc[name] = value;
        }
    }

    return acc;
}
