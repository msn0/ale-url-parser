import test from 'ava';
import { parse } from '.';

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
        path: ['gry','wiedzmin'],
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
        path: ['gry','wiedzmin'],
        query: []
    });
});

// test('should ')