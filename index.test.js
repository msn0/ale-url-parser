import test from 'ava';
import { parse, stringify } from './';

[
    {
        urlString: 'http://domain.ninja/foo/bar',
        urlObject: {
            protocol: 'http',
            host: 'domain.ninja',
            path: ['foo', 'bar']
        }
    }, {
        urlString: 'https://domain.ninja/foo/bar?a=b%3Dc%3Dd%3Ffoo&bar=1&bar=2',
        urlObject: {
            protocol: 'https',
            host: 'domain.ninja',
            path: ['foo', 'bar'],
            query: {
                a: 'b=c=d?foo',
                bar: ['1', '2']
            }
        }
    }
].forEach(({ urlString, urlObject }, index) => {
    test(`should produce expected result #${index + 1}`, t => {
        // a one way check operation
        t.deepEqual(parse(urlString), urlObject);
        t.is(stringify(urlObject), urlString);

        // check identity
        t.is(stringify(parse(urlString)), urlString);
        t.deepEqual(parse(stringify(urlObject)), urlObject);
    });
});
