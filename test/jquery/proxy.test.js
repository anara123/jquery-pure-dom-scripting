'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#proxy', function () {
  function Dog (name) {
    this.name = name
  }

  Dog.prototype.bark = function () {
    return 'bark ' + this.name
  }

  Dog.prototype.kill = function (cats) {
    return 'killed ' + cats + ' cats'
  }

  it('should bind the object to function this', function () {
    var dog = new Dog('foo')
    var speakProxy = $.proxy(dog.bark, dog)

    assert.equal(
      speakProxy(),
      'bark foo')
  })

  it('with param, it should pass the params to the binded function', function () {
    var dog = new Dog('foo')
    var killProxy = $.proxy(dog.kill, dog)

    assert.equal(
      killProxy(4),
      'killed 4 cats')
  })

  it('with static params, it should pass the params when invoked', function () {
    var dog = new Dog('foo')
    var killProxy = $.proxy(dog.kill, dog, [4])

    assert.equal(
      killProxy(),
      'killed 4 cats')
  })
})
