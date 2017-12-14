# ale-url-parser

Url parser built with performance and small size in mind.

## installation

```sh
$ npm i ale-url-parser
```

## usage

```js
const { parse, stringify } = require('ale-url-parser');

parse('http://domain.lol/lorem/ipsum?foo=1&bar=2#baz');
// {
//     protocol: 'http',
//     host: 'domain.lol',
//     path: ['foo', 'bar'],
//     query: {
//         foo: '1',
//         bar: '2'
//     },
//     hash: 'baz'
// }

stringify({
    protocol: 'https',
    host: 'domain.lol',
    path: ['foo', 'bar'],
    query: {
        foo: '1',
        bar: '2'
    },
    hash: 'baz'
});
// https://domain.lol/lorem/ipsum?foo=1&bar=2#baz
```

## license

MIT
