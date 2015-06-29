'use strict';

var STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,\)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,\)]*))/mg;
var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var ARG_SPLIT = /,/g;

module.exports = exports = function functionParams (fn) {
  return exports.fromString(typeof fn === 'string' ? fn : fn.toString());
};

exports.fromString = function fromString (str) {
  str = str.replace(STRIP_COMMENTS, '').trim();
  if (str.indexOf('function') === 0) {
    str = str.match(FN_ARGS)[1];
  } else if (str.indexOf('=>') > -1) {
    str = str.split('=>')[0].trim();
  }
  if (str[0] === '(' && str[str.length - 1] === ')') {
    str = str.slice(1, -1);
  }
  return str.length ? str.split(ARG_SPLIT).map(function (p) { return p.trim(); }) : [];
};
