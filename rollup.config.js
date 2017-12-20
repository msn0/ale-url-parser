const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babelrc = require('babelrc-rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

module.exports = {
    input: './lib/index.js',
    output: {
        format: 'umd',
        file: './lib/index.umd.js'
    },
    name: 'ale-url-parser',
    strict: false,
    plugins: [
        babel(babelrc.default()),
        resolve(),
        commonjs(),
        uglify()
    ]
};
