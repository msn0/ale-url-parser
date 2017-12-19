import test from 'ava';
import { stringify } from './stringify';

test('parse object with http protocol', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol'
    }), 'http://domain.lol');
});

test('parse object with https protocol', t => {
    t.deepEqual(stringify({
        protocol: 'https',
        host: 'domain.lol'
    }), 'https://domain.lol');
});

test('parse default to http protocol', t => {
    t.deepEqual(stringify({
        host: 'domain.lol'
    }), 'http://domain.lol');
});

test('parse object with empty protocol', t => {
    t.deepEqual(stringify({
        protocol: '',
        host: 'domain.lol'
    }), '//domain.lol');
});

test('parse object with path', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        path: ['foo', 'bar']
    }), 'http://domain.lol/foo/bar');
});

test('parse object with query', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        query: {
            priceMin: '300',
            priceMax: '500'
        }
    }), 'http://domain.lol?priceMin=300&priceMax=500');
});

test('parse object with multiple value for single query key', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        query: {
            foo: ['bar1', 'bar2']
        }
    }), 'http://domain.lol?foo=bar1&foo=bar2');
});

test('parse object with query and path', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        path: ['games', 'wiedzmin'],
        query: {
            priceMin: '300',
            priceMax: '500'
        }
    }), 'http://domain.lol/games/wiedzmin?priceMin=300&priceMax=500');
});

test('parse object with boolean query params', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        query: {
            foo: '',
            bar: ''
        }
    }), 'http://domain.lol?foo&bar');
});

test('should encode query values', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        query: {
            foo: ['foo & bar', '☺']
        }
    }), 'http://domain.lol?foo=foo%20%26%20bar&foo=%E2%98%BA');
});

test('should encode query names', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        query: {
            'foo[]': '1',
            'bar[]': '',
            'baz[]': ['2', '3']
        }
    }), 'http://domain.lol?foo%5B%5D=1&bar%5B%5D&baz%5B%5D=2&baz%5B%5D=3');
});

test('parse object with hash', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        hash: 'test'
    }), 'http://domain.lol#test');
});

// https://tools.ietf.org/html/rfc3986#section-3.4
test('pchar, "/" and "?" are allowed to be unencoded as per rfc3986#section-3.4', t => {
    t.deepEqual(stringify({
        protocol: 'https',
        host: 'domain.lol',
        query: {
            pchars: '/?:@!$&\'()*+,;=a',
            // route: 'http://foo.ninja/bar?baz=1',
            foo: '2'
        },
        hash: 'foobar'
    }), 'https://domain.lol?pchars=/?:@!$&\'()*+,;=a&foo=2#foobar');
});

test('should sort params using compareFunction if given', t => {
    const order = ['first', 'second', 'third', 'fourth'];
    const compareFunction = (a, b) => order.indexOf(a) > order.indexOf(b);

    t.deepEqual(
        stringify({
            host: 'domain.lol',
            query: {
                second: '2',
                third: '3',
                first: '1',
                fourth: '4'
            }
        }, { compareFunction }),
        'http://domain.lol?first=1&second=2&third=3&fourth=4'
    );
});

test('parse object with path to relative url', t => {
    t.deepEqual(stringify({
        path: ['foo', 'bar']
    }), '/foo/bar');
});

test('parse object with query to relative url', t => {
    t.deepEqual(stringify({
        query: { foo: '1', bar: '2' }
    }), '?foo=1&bar=2');
});

test('parse object with path and query to relative url', t => {
    t.deepEqual(stringify({
        path: ['foo', 'bar'],
        query: { foo: '1', bar: '2' }
    }), '/foo/bar?foo=1&bar=2');
});
