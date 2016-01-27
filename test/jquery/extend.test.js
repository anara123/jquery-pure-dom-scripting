'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#extend', function () {
  it('should add new property when not exist on src object', function () {
    var src = { moo: 'moo' }
    var extension = { koo: 'koo' }

    assert.deepEqual(
      $.extend(src, extension),
      { moo: 'moo', koo: 'koo' })
  })

  it('should override existing property on src object', function () {
    var src = { moo: 'moo' }
    var extension = { moo: 'koo' }

    assert.deepEqual(
      $.extend(src, extension),
      { moo: 'koo'})
  })
})
