const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const ale = require('../lib/index.umd');
const url = require('url');
const queryString = require('query-string');

const o = {
    // 'protocol': 'https',
    // 'host': 'some.very.long.domain1.com',
    // 'path': ['some', 'really', 'long', 'path', 'lorem', 'ipsum', 'dolor', 'sit', 'amet'],
    'query': {
        'foo': 'bar',
        'baz': 'qux',
        'order': 'm',
        'stan': 'nowe',
        'dostawa-kurier': '1',
        'price_from': '11',
        'price_to': '22',
        'freeShipping': '1',
        'super-sprzedawca': '1',
        'city': 'Gdańsk',
        'startingTime': '3',
        'a[]': ['1', '2', '3', '4', '5', '6', '7', '8'],
        'b[]': ['1', '3', '5', '7'],
        'b=[]': ['2', '4', '6', '8'],
        'route': ['https://domain.lol/foo/bar/baz/?advert=1', 'some-other-route']
    }
    // 'hash': 'hash-bash-mome-long-and-ugly____--%3F--ha-s-h'
};

console.log(ale.stringify(o));
console.log(url.format(o));

suite
    .add('ale-url-parser/stringify', () => {
        ale.stringify(o);
    })
    .add('url/parse', () => {
        url.format(o);
    })
    // .add('query-string/stringify', () => {
    //     queryString.stringify(o);
    // })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });
