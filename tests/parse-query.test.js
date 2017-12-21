import test from 'ava';
import { parseQuery } from '../lib/parse-query';

const testCases = [{
    queryString: 'foo=bar&baz=qux',
    queryObject: {
        foo: 'bar',
        baz: 'qux'
    }
}, {
    queryString: 'foo[]=bar&foo[]=baz',
    queryObject: {
        'foo[]': ['bar', 'baz']
    }
}, {
    queryString: 'a=b=c&d=e=f',
    queryObject: {
        a: 'b=c',
        d: 'e=f'
    }
}, {
    queryString: 'a&b',
    queryObject: {
        a: '',
        b: ''
    }
}, {
    queryString: 'a=b%3Dc',
    queryObject: {
        a: 'b=c'
    }
}, {
    queryString: 'a=http://domain.lol/foo/bar?foo=1&bar=2',
    queryObject: {
        a: 'http://domain.lol/foo/bar?foo=1',
        bar: '2'
    }
}, {
    queryString: 'a=http%3A%2F%2Fdomain.lol%2Ffoo%2Fbar%3Ffoo%3D1&bar=2',
    queryObject: {
        a: 'http://domain.lol/foo/bar?foo=1',
        bar: '2'
    }
}, {
    queryString: 'a=%E2%99%A1&b=★',
    queryObject: {
        a: '♡',
        b: '★'
    }
}, {
    queryString: 'a=http://domain.lol/foo/bar?foo=1&foo=2',
    queryObject: {
        a: 'http://domain.lol/foo/bar?foo=1',
        foo: '2'
    }
}, {
    queryString: 'foo=http://domain.lol/foo/bar?foo=1&foo=2',
    queryObject: {
        foo: ['http://domain.lol/foo/bar?foo=1', '2']
    }
}, {
    queryString: 'a%3Db=c&f%E2%98%85%E2%98%85=bar&b★z=★&a=%3F&a=%3D',
    queryObject: {
        'a=b': 'c',
        'f★★': 'bar',
        'b★z': '★',
        'a': ['?', '=']
    }
}];

testCases.forEach(({ queryString, queryObject }, index) => {
    test(`shoud parse simple query #${index + 1}`, t => {
        t.deepEqual(parseQuery(queryString), queryObject);
    });
});

test.failing('should handle + correctly', t => {
    t.deepEqual(parseQuery('a=b+c'), {
        a: 'b c'
    });
});
