import test from 'ava';
import { parse, stringify } from '.';

//Parse

test('should parse protocol', t => {
    t.is(parse('https://domain.pl/foo?bar').protocol, 'https');
});

test('should parse protocol and default to http when missing', t => {
    t.is(parse('domain.pl/foo?bar').protocol, 'http');
});

test('should parse host to object', t => {
    t.deepEqual(parse('http://domain.pl'), {
        protocol: 'http',
        host: 'domain.pl',
        path: [],
        query: []
    });
});

test('should parse simple query to object', t => {
    t.deepEqual(parse('http://domain.pl/gry/wiedzmin?priceMin=300&priceMax=500'), {
        protocol: 'http',
        host: 'domain.pl',
        path: ['gry', 'wiedzmin'],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    });

    t.deepEqual(parse('http://domain.pl?priceMin=300&priceMax=500'), {
        protocol: 'http',
        host: 'domain.pl',
        path: [],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    }),

    t.deepEqual(parse('http://domain.pl/gry/wiedzmin/'), {
        protocol: 'http',
        host: 'domain.pl',
        path: ['gry', 'wiedzmin'],
        query: []
    });
});

//Stringify

test('should parse object to url', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.pl',
        path: [],
        query: []
    }), 'http://domain.pl');
});

test('should parse simple object to query', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.pl',
        path: ['gry', 'wiedzmin'],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    }), 'http://domain.pl/gry/wiedzmin?priceMin=300&priceMax=500');

    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.pl',
        path: [],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    }), 'http://domain.pl?priceMin=300&priceMax=500'),

    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.pl',
        path: ['gry', 'wiedzmin'],
        query: []
    }), 'http://domain.pl/gry/wiedzmin');
});
