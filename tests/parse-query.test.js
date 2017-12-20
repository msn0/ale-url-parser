import test from 'ava';
import { parseQuery } from '../lib/parse-query';

const testCases = [{
    queryString: 'foo=bar&baz=qux',
    queryObject: {
        foo: 'bar',
        baz: 'qux'
    }
}];

testCases.forEach(({ queryString, queryObject }, index) => {
    test(`shoud parse simple query #${index + 1}`, t => {
        t.deepEqual(parseQuery(queryString), queryObject);
    });
});