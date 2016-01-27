'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#new create jquery without new keyword', function () {
  it('should return new object', function () {
    assert.deepEqual(
      $('.doo'),
      new $('.doo'))
  })
})
