'use strict'

var assert = require('chai').assert

describe('conext tests', function () {
  it('should increase the counter', function () {
    var dog = {
      barkCount: 0,
      bark: function () {
        this.barkCount += 1
      }
    }

    dog.bark()
    assert.equal(dog.barkCount, 1)
  })
})
