'use strict'

var assert = require('chai').assert
var equal = assert.equal
var eql = assert.deepEqual

var helper = require('../test-helper.js')
var $ = require('../../src/jquery.js')

describe('jquery#next', function () {
  before(function () {
    var html = [
      '<div id="doberman">Doberman Dog</div>',
      '<div id="beagles">Beagles Dog</div>',
      '<div id="boxer">Boxer Dog</div>',
    ]

    helper.setDocument(html)
  })

  after(function () {
    helper.resetDocument()
  })

  describe('call next once', function () {
    it('should return div#beagles', function () {
      equal(
        $('#doberman').next()[0].id,
        'beagles')
    })

    it('should be instanceof jquery', function () {
      equal(
        $('#doberman').next() instanceof $,
        true)
    })
  })

  describe('call next once twice', function () {
    it('should return div#boxer', function () {
      equal(
        $('#doberman').next().next()[0].id,
        'boxer')
    })
  })

  describe('3 elements - call next 3 times', function () {
    it('should return empty jquery element', function () {
      eql(
        $('#doberman').next().next().next(),
        $([]))
    })
  })
})
