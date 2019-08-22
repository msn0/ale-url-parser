<h1 align="center">
    <br>
    <img width=91 height=243 src="https://raw.githubusercontent.com/msn0/ale-url-parser/master/logo.png" alt="teti" />
    <br>
</h1>

# ale-url-parser [![Build Status](https://travis-ci.org/msn0/ale-url-parser.svg?branch=master)](http://travis-ci.org/msn0/ale-url-parser)

🍺 Top fermented URL parser and stringifier built with performance and small size (1.6KB) in mind.

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
    path: ['lorem', 'ipsum'],
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
    path: ['lorem', 'ipsum'],
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

[simple] ale-url-parser x 124,203 ops/sec ±0.67% (91 runs sampled)
[simple] url x 75,006 ops/sec ±1.03% (89 runs sampled)
[simple] query-string x 47,283 ops/sec ±0.77% (86 runs sampled)
[simple] fast-url-parser x 237,420 ops/sec ±0.66% (91 runs sampled)
[simple] Fastest is fast-url-parser
[complex] ale-url-parser x 16,846 ops/sec ±0.58% (89 runs sampled)
[complex] url x 8,104 ops/sec ±0.71% (86 runs sampled)
[complex] query-string x 5,884 ops/sec ±0.80% (87 runs sampled)
[complex] fast-url-parser x 15,430 ops/sec ±0.92% (87 runs sampled)
```
https://jsperf.com/ale-url-parser-vs-new-url

## TypeScript definitions

Type definitions for `ale-url-parser` are declared in `DefinitelyTyped` repository. We recommend installing `@types/ale-url-parser` for a better experience

```sh
$ npm i @types/ale-url-parser -D
```

## License

MIT
