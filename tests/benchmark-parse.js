const Benchmark = require('benchmark');
const ale = require('../lib/ale-url-parser.umd');
const url = require('url');
const queryString = require('query-string');
const fastUrlParser = require('fast-url-parser');

const urlsSimple = [
    'https://google.com/',
    '?foo=1&bar=2&foo=a',
    '/simple/path',
    'https://github.com/msn0/ale-url-parser',
    'http://domain.lol/foo/bar?foo=bar&baz=qux',
    'http://domain.lol/?foo=bar#hash',
    '//some.domain/path?query',
    '/path/q/d/f?foo=1#test'
];

const urlsComplex = [
    '/kategoria/drukarki-i-skanery-4578?string=Brother%20%22MFC-J4420DW%22%20(toner*%20tusz*%20b%C4%99ben)&'
        + 'utm_source=google&utm_medium=cpc&n=_onika%20-%20Komputery%20-%20Drukarki%20i%20Skanery&'
        + 'r=Elektronika%20-%20Komputery%20-%20Drukarki%20i%20Skanery%20-%20Tusze%20i%20tonery%20-%20Brother%20MFC-J4420DW'
        + '&n=Brother%20%2BMFC-J4420DW%20%2Btusz&gclid=Tw_kE&g=aw.s&d=L0A&order=d&h=ssce-ki-5-g-2-0328&price_from=40',
    'https://www.adidas.pl/buty-gazelle-shoes/BB5480.html?pr=CUSTOMIZE_IMG_Buty%2520Gazelle%2520Shoes',
    'https://www.google.pl/search?q=decodeURIComponent+is+slow&oq=decodeURIComponent+is+slow&aqs=chrome..69i57.1616j0j7&sourceid=chrome&ie=UTF-8',
    '?a=http%3A%2F%2Fdomain.lol%2Ffoo%2Fbar%3Ffoo%3D1&bar=2',
    '//domain.ninja/foo/bar/baz?route=https%3A%2F%2Fapi.domain.ninja%2Ffoo%3Fbar%5B%5D%3D1'
        + '&bar%5B%5D=2&bar%5B%5D=3&lorem=1&ipsu%3Dm=nothing#hash',
    'https://allegro.pl/kategoria/ogrod-1532?order=m&stan=nowe&dostawa-kurier=1&price_from=11&price_to=22&freeShipping=1&super-sprzedawca=1&city=Gda%C5%84sk&startingTime=3',
    'https://some.very.long.domain1.com/some/really/long/path/lorem/ipsum/dolor/sit/amet?foo=bar&baz=qux&order=m&stan=nowe&dostawa-kurier=1&price_from=11&price_to=22&freeShipping=1&super-sprzedawca=1&city=Gda%C5%84sk&startingTime=3&a[]=1&a[]=2&a[]=3&a[]=4&a[]=5&a[]=6&a[]=7&a[]=8&b[]=1&b%3d[]=2&b[]=3&b%3d[]=4&b[]=5&b%3d[]=6&b[]=7&b%3d[]=8&route=https://domain.lol/foo/bar/baz/?advert=1&route=some-other-route#hash-bash-mome-long-and-ugly____--%3F--ha-s-h',
    'https://some.very.long.domain1.com/some/really/long/path/lorem/ipsum/dolor/sit/amet?foo=bar&baz=qux&order=m&stan=nowe&dostawa-kurier=1&price_from=11&price_to=22&freeShipping=1&super-sprzedawca=1&city=Gda%C5%84sk&startingTime=3&a%5B%5D=1&a%5B%5D=2&a%5B%5D=3&a%5B%5D=4&a%5B%5D=5&a%5B%5D=6&a%5B%5D=7&a%5B%5D=8&b%5B%5D=1&b%5B%5D=3&b%5B%5D=5&b%5B%5D=7&b%3D%5B%5D=2&b%3D%5B%5D=4&b%3D%5B%5D=6&b%3D%5B%5D=8&route=https%3A%2F%2Fdomain.lol%2Ffoo%2Fbar%2Fbaz%2F%3Fadvert%3D1&route=some-other-route#hash-bash-mome-long-and-ugly____--%3F--ha-s-h'
];

function runSuite(suite, urls, label) {
    return new Promise(resolve => {
        suite
            .add('ale-url-parser', () => urls.forEach(ale.parse))
            .add('url', () => urls.forEach(u => url.parse(u, true)))
            .add('query-string', () => urls.forEach(queryString.parse))
            .add('fast-url-parser', () => urls.forEach(u => fastUrlParser.parse(u, true)))
            .on('cycle', function(event) {
                console.log(`[${label}] ${String(event.target)}`);
            })
            .on('complete', function() {
                console.log(`[${label}] Fastest is ${this.filter('fastest').map('name')}`);
                resolve();
            })
            .run({ 'async': true });
    });
}

runSuite(new Benchmark.Suite(), urlsSimple, 'simple').then(() => {
    runSuite(new Benchmark.Suite(), urlsComplex, 'complex');
});
