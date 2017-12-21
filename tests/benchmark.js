const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const ale = require('../lib/index.umd');
const url = require('url');
const queryString = require('query-string');

const url1 = 'domain.lol';
const url2 = '?a=http%3A%2F%2Fdomain.lol%2Ffoo%2Fbar%3Ffoo%3D1&bar=2';
const url3 = '//domain.ninja/foo/bar/baz?route=https%3A%2F%2Fapi.domain.ninja%2Ffoo%3Fbar%5B%5D%3D1&bar%5B%5D=2&bar%5B%5D=3&lorem=1&ipsu%3Dm=nothing#hash';
const url4 = 'https://allegro.pl/kategoria/ogrod-1532?order=m&stan=nowe&dostawa-kurier=1&price_from=11&price_to=22&freeShipping=1&super-sprzedawca=1&city=Gda%C5%84sk&startingTime=3';
const url5 = 'http://domain.lol/foo/bar';
const url6 = 'domain.lol/foo?foo=bar&baz=qux#hash';
const url7 = 'https://some.very.long.domain1.com/some/really/long/path/lorem/ipsum/dolor/sit/amet?foo=bar&baz=qux&order=m&stan=nowe&dostawa-kurier=1&price_from=11&price_to=22&freeShipping=1&super-sprzedawca=1&city=Gda%C5%84sk&startingTime=3&a[]=1&a[]=2&a[]=3&a[]=4&a[]=5&a[]=6&a[]=7&a[]=8&b[]=1&b%3d[]=2&b[]=3&b%3d[]=4&b[]=5&b%3d[]=6&b[]=7&b%3d[]=8&route=https://domain.lol/foo/bar/baz/?advert=1&route=some-other-route#hash-bash-mome-long-and-ugly____--%3F--ha-s-h';

suite
    .add('ale-url-parser/parse', () => {
        ale.parse(url1);
        ale.parse(url2);
        ale.parse(url3);
        ale.parse(url4);
        ale.parse(url5);
        ale.parse(url6);
        ale.parse(url7);
    })
    .add('url/parse', () => {
        url.parse(url1, true);
        url.parse(url2, true);
        url.parse(url3, true);
        url.parse(url4, true);
        url.parse(url5, true);
        url.parse(url6, true);
        url.parse(url7, true);
    })
    .add('query-string/parse', () => {
        queryString.parse(url1);
        queryString.parse(url2);
        queryString.parse(url3);
        queryString.parse(url4);
        queryString.parse(url5);
        queryString.parse(url6);
        queryString.parse(url7);
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({ 'async': true });
