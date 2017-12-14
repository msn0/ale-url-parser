import test from 'ava';
import { stringify } from './stringify';

test('parse object with empty protocol', t => {
    t.deepEqual(stringify({
        protocol: '',
        host: 'domain.lol',
        path: [],
        query: []
    }), '//domain.lol');
});

test('parse object with http protocol', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: [],
        query: []
    }), 'http://domain.lol');
});

test('parse object with https protocol', t => {
    t.deepEqual(stringify({
        protocol: 'https',
        host: 'domain.lol',
        path: [],
        query: []
    }), 'https://domain.lol');
});

test('parse object with path', t => {
    t.deepEqual(stringify({
        protocol: 'https',
        host: 'domain.lol',
        path: ['foo', 'bar'],
        query: []
    }), 'https://domain.lol/foo/bar');
});

test('parse object with query', t => {
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
    }), 'http://domain.lol?priceMin=300&priceMax=500');
});

test('parse object with query and path', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: ['games', 'wiedzmin'],
        query: [{
            name: 'priceMin',
            value: '300'
        }, {
            name: 'priceMax',
            value: '500'
        }]
    }), 'http://domain.lol/games/wiedzmin?priceMin=300&priceMax=500');
});
