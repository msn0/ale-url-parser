import test from 'ava';
import { parseQuery } from '../lib/parse-query';

const testCases = [{
    queryString: '',
    queryObject: {}
}, {
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
}];

testCases.forEach(({ queryString, queryObject }, index) => {
    test(`shoud parse simple query #${index + 1}`, t => {
        t.deepEqual(parseQuery(queryString), queryObject);
    });
});
