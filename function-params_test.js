'use strict';
var chai = require('chai');
var functionParams = require('./');

chai.should();

describe('function-params', function() {
  it('can get parameter names from a function', function () {
    functionParams(function (a, b) {}).should.eql(['a', 'b']);
  });

  it('can get parameter names from a string', function () {
    functionParams('function (a, b) {}').should.eql(['a', 'b']);
  });

  describe('fromString', function() {
    it('can handle comments among params', function () {
      functionParams.fromString('function (/* comment */ a, b /* comment */) { }')
                    .should.eql(['a', 'b']);
      functionParams.fromString('function (\n  a, // first parameter\n  b // second parameter\n) { }')
                    .should.eql(['a', 'b']);
    });

    it('can handle functions with names', function () {
      functionParams.fromString('function func1 (a, b) { }')
                    .should.eql(['a', 'b']);
      functionParams.fromString('function func1(\n  a,\n  b\n) { }')
                    .should.eql(['a', 'b']);
    });

    it('can handle functions with defaults (ES6)', function () {
      functionParams.fromString('function func1 (a = 1, b = {}) { }')
                    .should.eql(['a', 'b']);
      functionParams.fromString('function func1(\n  a = [],\n  b = {c: 1}\n) { }')
                    .should.eql(['a', 'b']);
    });

    it('can handle arrow functions with one parameter (ES6)', function () {
      functionParams.fromString('a => a')
                    .should.eql(['a']);
      functionParams.fromString('a => { return a; }')
                    .should.eql(['a']);
    });

    it('can handle arrow functions with multiple parameter (ES6)', function () {
      functionParams.fromString('(a, b) => a * b')
                    .should.eql(['a', 'b']);
      functionParams.fromString('(a, b) => { return a * b; }')
                    .should.eql(['a', 'b']);
    });

    it('can handle arrow functions with multiple parameter and defaults (ES6)', function () {
      functionParams.fromString('(a = 1, b = {}) => a * b')
                    .should.eql(['a', 'b']);
      functionParams.fromString('(\n  a = [],\n  b = {c: 1}\n) => a * b')
                    .should.eql(['a', 'b']);
      functionParams.fromString('(\n  a = [],\n  b = {c: 1}\n) => { return a * b; }')
                    .should.eql(['a', 'b']);
    });
  });
});
