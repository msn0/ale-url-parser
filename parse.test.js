import test from 'ava';
import { parse } from './parse';

test('should parse protocol', t => {
    t.is(parse('https://domain.lol/foo?bar').protocol, 'https');
});

test('should parse protocol and default to http when missing', t => {
    t.is(parse('domain.lol/foo?bar').protocol, 'http');
});

test('should return empty protocol for URL that starts with //', t => {
    t.is(parse('//domain.lol/foo?bar').protocol, '');
});

test('should parse host', t => {
    t.is(parse('http://domain.lol/').host, 'domain.lol');
});

test('should parse path', t => {
    t.deepEqual(parse('http://domain.lol/foo/bar/baz').path, ['foo', 'bar', 'baz']);
});

test('should parse empty path', t => {
    t.deepEqual(parse('http://domain.lol').path, []);
});

// https://tools.ietf.org/html/rfc3986#section-3.4
test('should allow unescaped reserved chars in query string values', t => {
    t.deepEqual(parse('https://domain.lol?route=http://foo.ninja/bar?baz=1#foobar'), {
        protocol: 'https',
        host: 'domain.lol',
        path: [],
        query: {
            route: 'http://foo.ninja/bar?baz=1'
        },
        hash: 'foobar'
    });
});

// https://tools.ietf.org/html/rfc3986#section-3.4
test('should allow escaped reserved chars in query string values', t => {
    t.deepEqual(parse('https://domain.lol?route=http%3A%2F%2Ffoo.ninja%2Fbar%3Fbaz%3D1#foobar'), {
        protocol: 'https',
        host: 'domain.lol',
        path: [],
        query: {
            route: 'http://foo.ninja/bar?baz=1'
        },
        hash: 'foobar'
    });
});

test('should parse query string', t => {
    t.deepEqual(parse('http://domain.lol/games/wiedzmin?priceMin=300&price-max=500').query, {
        priceMin: '300',
        'price-max': '500'
    });
});

test('should parse query string and decode query value', t => {
    t.deepEqual(parse('https://domain.lol?lorem=ipsum%20dolor%20/%20sit%20%26%20amet').query, {
        lorem: 'ipsum dolor / sit & amet'
    });
});

test('should parse query string and decode query name', t => {
    t.deepEqual(parse('https://domain.lol?foo%5B%5D=1&bar%5B%5D&baz%5B%5D=2&baz%5B%5D=3').query, {
        'foo[]': '1',
        'bar[]': '',
        'baz[]': ['2', '3']
    });
});

test('should parse query string and decode uri components', t => {
    t.deepEqual(parse('https://domain.lol?lorem=ipsum%20dolor%20/%20sit%20%26%20amet').query, {
        lorem: 'ipsum dolor / sit & amet'
    });
});

test('should parse boolean query string parameters', t => {
    t.deepEqual(parse('https://domain.lol?lorem').query, {
        lorem: ''
    });
});

test('should parse multi-value query string parameters', t => {
    t.deepEqual(parse('https://domain.lol?foo=1&foo=2').query, {
        foo: ['1', '2']
    });
});

test('should parse empty query string', t => {
    t.deepEqual(parse('https://domain.lol/foo/bar/').query, {});
});

test('should parse hash', t => {
    t.deepEqual(parse('https://domain.lol/foo?bar=1#baz').hash, 'baz');
});

test('should parse empty hash', t => {
    t.deepEqual(parse('https://domain.lol/foo?bar=1').hash, '');
});

test('parse relative url with path', t => {
    t.deepEqual(parse('/foo/bar').path, ['foo', 'bar']);
});

test('parse relative url with query', t => {
    t.deepEqual(parse('?foo=1&bar=2').query, { foo: '1', bar: '2' });
});

test('parse relative url with path and query', t => {
    t.deepEqual(parse('/foo/bar').path, ['foo', 'bar']);
    t.deepEqual(parse('?foo=1&bar=2').query, { foo: '1', bar: '2' });
});
