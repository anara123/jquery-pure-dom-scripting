'use strict'

var assert = require('chai').assert

var DOT = require('../src/dot.js')

describe('DOT method', function () {
  function Person (name) {
    this.name = name
  }

  Person.prototype.isPerson = true

  it('should return the property which on the object itself', function () {
    var p = new Person('foo')

    assert.equal(
      DOT(p, 'name'),
      'foo')
  })

  it("should return property from 1 it's prototype", function () {
    var p = new Person('foo')

    assert.equal(
      DOT(p, 'isPerson'),
      true)
  })

  it('should return property from Object prototype', function () {
    var p = new Person('foo')

    assert.equal(
      DOT(p, 'toString').call(p),
      '[object Object]')
  })

  it('should return undefined when property not exist', function () {
    var p = new Person('foo')

    assert.isUndefined(
      DOT(p, 'moo'))
  })
})
