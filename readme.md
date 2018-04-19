# ale-url-parser [![Build Status](https://travis-ci.org/msn0/ale-url-parser.svg?branch=master)](http://travis-ci.org/msn0/ale-url-parser)

Url parser and stringifier built with performance and small size in mind.

## Installation

```sh
$ npm i ale-url-parser
```

## Usage

### parse :: String -> Object

Parse url string and return url object.

```js
const { parse } = require('ale-url-parser');
```

#### Basic example

```js
parse('http://domain.lol/lorem/ipsum?foo=1&bar=2#baz');

{
    protocol: 'http',
    host: 'domain.lol',
    path: ['foo', 'bar'],
    query: { foo: '1', bar: '2' },
    hash: 'baz'
}
```

#### Preserve protocol

```js
parse('//domain.lol');

{
    protocol: '',
    host: 'domain.lol',
    path: [], query: {}, hash: ''
}
```

#### Http by default

```js
parse('domain.lol');

{
    protocol: 'http',
    host: 'domain.lol',
    path: [], query: {}, hash: ''
}
```


#### Multi-valued query parameters

```js
parse('domain.lol?foo=1&foo=2&bar=3');

{
    protocol: 'http',
    host: 'domain.lol',
    path: [],
    query: { foo: ['1', '2'], bar: '3' },
    hash: ''
}
```

#### Parsing relative urls

```js
parse('?foo=1');

{
    protocol: 'http',
    host: '',
    path: [],
    query: { foo: '1' },
    hash: ''
}
```

### stringify :: Object -> String

Stringify url object to url string.

```js
const { stringify } = require('ale-url-parser');
```

#### Basic example

```js
stringify({
    protocol: 'https',
    host: 'domain.lol',
    path: ['foo', 'bar'],
    query: { foo: '1', bar: '2' },
    hash: 'baz'
});

"https://domain.lol/lorem/ipsum?foo=1&bar=2#baz"
```

#### Preserve protocol

```js
stringify({
    protocol: '',
    host: 'domain.lol'
});

"//domain.lol"
```

#### Multi-valued query parameters

```js
stringify({
    protocol: 'https',
    host: 'domain.lol',
    query: { foo: ['1', '2'], bar: '/baz' }
});

"https://domain.lol?foo=1&foo=2&bar=%2Fbaz"
```

#### Build relative urls

```js
stringify({
    path: ['lorem', 'ipsum'],
    query: { foo: '1', bar: '2' }
});

"/lorem/ipsum?foo=1&bar=2"
```

#### Sort query params with custom compareFunction

Sorting query params is disabled by default. You can define your own sorting method by passing `compareFunction`:

```js
const order = ['first', 'second', 'third', 'fourth'];
stringify({
    host: 'domain.lol',
    query: { third: '3', first: '1', fourth: '4', second: '2' }
}, {
    compareFunction: (a, b) => order.indexOf(a) > order.indexOf(b)
});

"http://domain.lol?first=1&second=2&third=3&fourth=4"
```

## Caveats

`ale-url-parser` is limited to be used with `http` and `https` protocols though context-aware protocol guess is supported by passing an empty string to `stringify` function, i.e. `protocol: ''`.

## Benchmarks

```sh
$ npm t && npm run prepare && node ./tests/benchmark-parse.js

[simple] ale-url-parser x 92,867 ops/sec ±1.21% (87 runs sampled)
[simple] url x 44,822 ops/sec ±1.14% (88 runs sampled)
[simple] query-string x 29,612 ops/sec ±1.08% (83 runs sampled)
[simple] fast-url-parser x 130,799 ops/sec ±1.03% (88 runs sampled)
[simple] Fastest is fast-url-parser
[complex] ale-url-parser x 14,087 ops/sec ±1.00% (88 runs sampled)
[complex] url x 5,509 ops/sec ±0.98% (86 runs sampled)
[complex] query-string x 3,976 ops/sec ±1.17% (87 runs sampled)
[complex] fast-url-parser x 11,231 ops/sec ±1.05% (86 runs sampled)
[complex] Fastest is ale-url-parser
```
https://jsperf.com/ale-url-parser-vs-new-url

## License

MIT
