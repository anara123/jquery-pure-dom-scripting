'use strict'

var assert = require('chai').assert

var INSTANCEOF = require('../src/instance-of.js')

describe('INSTANCEOF test', function () {
  function Person (name) {
    this.name = name
  }

  Person.prototype.speak = function () {
    return 'My name ' + this.name
  }

  function Student (name) {
    Person.call(this, name)
  }

  Student.prototype = Person.prototype

  function Animal () {
  }

  it('should return true when p is INSTANCEOF Person', function () {
    var p = new Person('goo')

    assert.isTrue(INSTANCEOF(p, Person))
  })

  it('should return true if the same object', function () {
    var p = new Person('goo')

    assert.throws(function () {
      INSTANCEOF(p, p)
    })
  })

  it('should return true when student INSTANCEOF Person', function () {
    var s = new Student('koo')

    assert.isTrue(INSTANCEOF(s, Person))
  })

  it('should return false when moo is INSTANCEOF Animal', function () {
    var animal = new Animal()

    assert.isFalse(INSTANCEOF(animal, Person))
  })
})
