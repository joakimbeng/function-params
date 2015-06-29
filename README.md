# function-params

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url]

> Get parameter names for a given function (with ES6 arrow syntax support)

## Installation

Install `function-params` using [npm](https://www.npmjs.com/):

```bash
npm install --save function-params
```

## Usage

### Module usage

```javascript
var functionParams = require('function-params');

functionParams(function (a, b, /* c */ d, e = 'f')); // ['a', 'b', 'd', 'e']

// Arrow functions:
functionParams(a => a); // ['a']
```

## API

### `functionParams(fn)`

| Name | Type | Description |
|------|------|-------------|
| fn | `Function` | The function to get parameter names for |

Get parameter names from a function.

### `functionParams.fromString(str)`

| Name | Type | Description |
|------|------|-------------|
| str | `String` | A stringified function to get parameter names for |

Get parameter names from a function string.

## License

MIT

[npm-url]: https://npmjs.org/package/function-params
[npm-image]: https://badge.fury.io/js/function-params.svg
[travis-url]: https://travis-ci.org/joakimbeng/function-params
[travis-image]: https://travis-ci.org/joakimbeng/function-params.svg?branch=master
