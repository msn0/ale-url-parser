# ale-url-parser

Url parser built with performance and small size in mind.

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
    query: { foo: ['1', '2'], bar: '3' }
});

"https://domain.lol?foo=1&foo=2&bar=3"
```


#### Sort query params with custom compareFunction

```js
const order = ['first', 'second', 'third', 'fourth'];
stringify({
    host: 'domain.lol',
    query: { third: '3', first: '1', fourth: '4', second: '2'  }
}, {
    compareFunction: (a, b) => order.indexOf(a) > order.indexOf(b)
});

"http://domain.lol?first=1&second=2&third=3&fourth=4"
```

## Caveats

`ale-utl-parser` is limited to be used with `http` and `https` protocols though context-aware protocol guess is supported by passing an empty string to `stringify` function, i.e. `protocol: ''`.

## License

MIT