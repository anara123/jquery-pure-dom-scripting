'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#each', function () {
  it('should loop over array', function () {
    var collection = ['a', 'b']
    $.each(collection, function (index, value) {
      if (index === 0) {
        assert.equal(value, 'a')
      } else if (index === 1) {
        assert.equal(value, 'b')
      } else {
        assert.isTrue(false)
      }
    })
  })

  it('should iterate over object property', function () {
    var obj = { foo: 'foo1', moo: 'moo1' }

    $.each(obj, function (prop, value) {
      if (prop === 'foo') {
        assert.equal(value, 'foo1')
      } else if (prop === 'moo') {
        assert.equal(value, 'moo1')
      } else {
        assert.isTrue(false)
      }
    })
  })
})
