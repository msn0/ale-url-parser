import test from 'ava';
import { parse } from '.';

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

test('should parse query string', t => {
    t.deepEqual(
        parse('http://domain.lol/games/wiedzmin?priceMin=300&price-max=500'), [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'price-max',
            value: '500'
        }]
    );
});

test('should parse query string and decode components', t => {
    t.deepEqual(
        parse('https://domain.lol?lorem=ipsum%20dolor%20/%20sit%20&%20amet'),
        [{
            name: 'lorem',
            value: 'ipsum dolor / sit & amet'
        }]
    );
});

test('should parse empty query string', t => {
    t.deepEqual(parse('https://domain.lol/foo/bar/'), []);
});
