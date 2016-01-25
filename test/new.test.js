'use strict'

var assert = require('chai').assert
require('chai').use(require('chai-shallow-deep-equal'))

var _ = require('lodash')

var NEW = require('../src/new.js').NEW
var OBJECT_CREATE = require('../src/new.js').OBJECT_CREATE

describe('NEW tests', function () {
  function Person (name) {
    this.name = name
  }

  Person.prototype.speak = function () {
    return 'Hello ' + this.name
  }

  it('should create an Person object', function () {
    var p = NEW(Person, ['foo'])

    assert.deepEqual(
      p,
      new Person('foo'))
  })

  it('should bound the person context', function () {
    var p = NEW(Person, ['moo'])

    assert.equal(
      p.speak(),
      'Hello moo')
  })
})

describe('OBJECT_CREATE test', function () {
  var Animal = {
    init: function (name) {
      this.name = name
    },

    poop: function () {
      return this.name + ' pooping'
    }
  }

  var catProps = {
    meaw: function () {
      return this.name + ' meawing'
    }
  }

  var Cat = Object.create(Animal, catProps)

  var SiamiCat = Object.create(Cat, {
    fights: { value: 5 }
  })

  it('should create new object', function () {
    var miki = OBJECT_CREATE(Cat)

    assert.deepEqual(
      miki,
      Object.create(Cat))
  })

  it('Object inheritance should be equal', function () {
    var Cat2 = OBJECT_CREATE(Animal, catProps)

    assert.deepEqual(
      Cat2,
      Cat)

  })

  it('initializing objects', function () {
    var moo = Object.create(SiamiCat)
    moo.init('moo')

    var moo2 = OBJECT_CREATE(SiamiCat)
    moo2.init('moo')

    assert.equal(
      moo2.name,
      moo.name)
  })

})
