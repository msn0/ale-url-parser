import { indexOf } from './utils';

export function parseQuery (queryString) {
    // TODO: compare with https://url.spec.whatwg.org/#concept-url-parser
    return queryString
        .split('&')
        .reduce((acc, next) => {
            const indexOfEqualsSign = indexOf('=', next);
            const param = [];
            if (indexOfEqualsSign !== -1) {
                param.push(next.substr(0, indexOfEqualsSign), next.substr(indexOfEqualsSign + 1));
            } else {
                param.push(next);
            }

            if (param[1] && param[1].indexOf('+') > -1) { 
                param[1] = param[1].replace(/\+/g, ' ');
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
