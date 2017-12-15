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

test('parse object with hash', t => {
    t.deepEqual(stringify({
        host: 'domain.lol',
        hash: 'test'
    }), 'http://domain.lol#test');
});

test('should sort params using compareFunction if given', t => {
    const order = ['first', 'second', 'third', 'fourth'];
    const compareFunction = (a, b) => {
        return order.indexOf(a) > order.indexOf(b);
    };

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
