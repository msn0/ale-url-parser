import test from 'ava';
import { stringify } from './stringify';

test('parse object with empty protocol', t => {
    t.deepEqual(stringify({
        protocol: '',
        host: 'domain.lol',
        path: [],
        query: {}
    }), '//domain.lol');
});

test('parse object with http protocol', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: [],
        query: {}
    }), 'http://domain.lol');
});

test('parse object with https protocol', t => {
    t.deepEqual(stringify({
        protocol: 'https',
        host: 'domain.lol',
        path: [],
        query: {}
    }), 'https://domain.lol');
});

test('parse object with path', t => {
    t.deepEqual(stringify({
        protocol: 'https',
        host: 'domain.lol',
        path: ['foo', 'bar'],
        query: {}
    }), 'https://domain.lol/foo/bar');
});

test('parse object with query', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: [],
        query: {
            'priceMin': '300',
            'priceMax': '500'
        }
    }), 'http://domain.lol?priceMin=300&priceMax=500');
});

test('parse object with query and path', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: ['games', 'wiedzmin'],
        query: {
            'priceMin': '300',
            'priceMax': '500'
        }
    }), 'http://domain.lol/games/wiedzmin?priceMin=300&priceMax=500');
});

test('parse object with boolean query params', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: ['foo'],
        query: {
            'foo': '',
            'bar': ''
        }
    }), 'http://domain.lol/foo?foo&bar');
});

test('parse object with hash', t => {
    t.deepEqual(stringify({
        protocol: 'http',
        host: 'domain.lol',
        path: ['foo'],
        query: {
            'foo': '',
            'bar': ''
        },
        hash: 'test'
    }), 'http://domain.lol/foo?foo&bar#test');
});

test('should sort params using compareFunction if given', t => {
    const order = ['first', 'second', 'third', 'fourth'];
    const compareFunction = (a, b) => {
        return order.indexOf(a) > order.indexOf(b);
    };

    t.deepEqual(
        stringify({
            protocol: 'http',
            host: 'domain.lol',
            path: ['foo'],
            query: {
                'second': '2',
                'third': '3',
                'first': '1',
                'fourth': '4'
            }
        }, { compareFunction }),
        'http://domain.lol/foo?first=1&second=2&third=3&fourth=4'
    );
});
