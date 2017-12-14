import test from 'ava';
import { stringify } from '.';

test('should parse object to url', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: [],
        query: []
    }), 'http://domain.lol');
});

test('should parse simple object to query', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: ['gry', 'wiedzmin'],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    }), 'http://domain.lol/gry/wiedzmin?priceMin=300&priceMax=500');

    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: [],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    }), 'http://domain.lol?priceMin=300&priceMax=500'),

    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: ['gry', 'wiedzmin'],
        query: []
    }), 'http://domain.lol/gry/wiedzmin');
});
