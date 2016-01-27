'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#isArray', function () {
  it('should return true when array passed', function () {
    assert.isTrue($.isArray([]))
    assert.isTrue($.isArray(new Array(5, 3)))

  })

  it('should return false if object passed', function () {
    assert.isFalse($.isArray(arguments))
    assert.isFalse($.isArray(55))
    assert.isFalse($.isArray({ koo: 'koo' }))
  })
})
