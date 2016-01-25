'use strict'

var assert = require('chai').assert

var DOT_CALL = require('../src/dot-call.js')

describe('DOT_CALL test', function () {
  function Person (name) {
    this.name = name
  }

  Person.prototype.speak = function () {
    return 'My name is ' + this.name
  }

  Person.prototype.point = function (x, y) {
    return '(' + x + ',' + y + ')'
  }

  it('should call toString with context', function () {
    var p = new Person('foo')

    assert.equal(
      DOT_CALL(p, 'speak', []),
      'My name is foo')
  })

  it('should pass params', function () {
    var p = new Person('foo')

    assert.equal(
      DOT_CALL(p, 'point', [5, 23]),
      '(5,23)')
  })

  it.skip('changing one property, changes the others', function () {
    var Animal = function () {
      this.offspring = []
      this.foo = 'foo'
      this.moo = { val: 'moo' }
    }

    var Dog = function (name) {
      this.name = name
    }
    Dog.prototype = new Animal()

    var dog1 = new Dog('dog1')
    var dog2 = new Dog('dog2')
    var pup = new Dog('pup')

    dog1.foo = 'dog1'
    dog1.offspring.push('moo')
    console.log('1######', dog1)
    console.log('2######', dog1.__proto__)
    assert.equal(
      dog1.foo,
      'foo')

    dog1.moo.val = 'goo'
    assert.equal(
      dog2.moo.val,
      'moo')

    dog1.offspring.push(pup)
    assert.deepEqual(
      dog2.offspring,
      [])

  })
})
