import test from 'ava';
import { parse, stringify } from '../lib/';

const testCases = [
    {
        urlString: 'http://domain.ninja',
        urlObject: {
            protocol: 'http',
            host: 'domain.ninja',
            path: [],
            query: {},
            hash: ''
        }
    },
    {
        urlString: 'http://domain.ninja/foo/bar',
        urlObject: {
            protocol: 'http',
            host: 'domain.ninja',
            path: ['foo', 'bar'],
            query: {},
            hash: ''
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
            },
            hash: ''
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
            },
            hash: ''
        }
    }, {
        urlString: 'https://some.very.long.domain1.com/some/really/long/path/lorem/ipsum/dolor/sit/amet?foo=bar&baz=qux&order=m&stan=nowe&dostawa-kurier=1&price_from=11&price_to=22&freeShipping=1&super-sprzedawca=1&city=Gda%C5%84sk&startingTime=3&a%5B%5D=1&a%5B%5D=2&a%5B%5D=3&a%5B%5D=4&a%5B%5D=5&a%5B%5D=6&a%5B%5D=7&a%5B%5D=8&b%5B%5D=1&b%5B%5D=3&b%5B%5D=5&b%5B%5D=7&b%3D%5B%5D=2&b%3D%5B%5D=4&b%3D%5B%5D=6&b%3D%5B%5D=8&route=https%3A%2F%2Fdomain.lol%2Ffoo%2Fbar%2Fbaz%2F%3Fadvert%3D1&route=some-other-route#hash-bash-mome-long-and-ugly____--%3F--ha-s-h',
        urlObject: {
            protocol: 'https',
            host: 'some.very.long.domain1.com',
            path: ['some', 'really', 'long', 'path', 'lorem', 'ipsum', 'dolor', 'sit', 'amet'],
            query: {
                foo: 'bar',
                baz: 'qux',
                order: 'm',
                stan: 'nowe',
                'dostawa-kurier': '1',
                price_from: '11',
                price_to: '22',
                freeShipping: '1',
                'super-sprzedawca': '1',
                city: 'Gdańsk',
                startingTime: '3',
                'a[]': ['1', '2', '3', '4', '5', '6', '7', '8'],
                'b[]': ['1', '3', '5', '7'],
                'b=[]': ['2', '4', '6', '8'],
                route: [
                    'https://domain.lol/foo/bar/baz/?advert=1',
                    'some-other-route'
                ]
            },
            hash: 'hash-bash-mome-long-and-ugly____--%3F--ha-s-h'
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
