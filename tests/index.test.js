import test from 'ava';
import { parse, stringify } from '../lib/';

const testCases = [
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
    }, {
        urlString: '//domain.ninja/foo/bar/baz?route=https%3A%2F%2Fapi.domain.ninja%2Ffoo%3Fbar%5B%5D%3D1&bar%5B%5D=2&bar%5B%5D=3',
        urlObject: {
            protocol: '',
            host: 'domain.ninja',
            path: ['foo', 'bar', 'baz'],
            query: {
                route: 'https://api.domain.ninja/foo?bar[]=1',
                'bar[]': ['2', '3']
            }
        }
    }
];

testCases.forEach(({ urlString, urlObject }, index) => {
    test(`should produce expected result #${index + 1}`, t => {
        t.deepEqual(parse(urlString), urlObject);
        t.is(stringify(urlObject), urlString);
    });
});

testCases.forEach(({ urlString, urlObject }, index) => {
    test(`should be inversible #${index + 1}`, t => {
        t.is(stringify(parse(urlString)), urlString);
        t.deepEqual(parse(stringify(urlObject)), urlObject);
    });
});
