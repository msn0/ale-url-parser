import test from 'ava';
import { parse } from '.';

test('should parse host to object', t => {
    t.deepEqual(parse('http://domain.pl'), {
        host: 'http://domain.pl',
        path: [],
        query: []
    })
})

test('should parse simple query to object', t => {
    t.deepEqual(parse('http://domain.pl/gry/wiedzmin?priceMin=300&priceMax=500'), {
        host: 'http://domain.pl',
        path: ['gry','wiedzmin'],
        query: [{
            name: 'priceMin',
            value: 300
        }, {
            name: 'priceMax',
            value: 500
        }]
    })
})
