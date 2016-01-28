'use strict'

var assert = require('chai').assert
var equal = assert.equal
var eql = assert.deepEqual

var helper = require('../test-helper.js')
var $ = require('../../src/jquery.js')

describe('jquery#prev', function () {
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
        $('#boxer').prev()[0].id,
        'beagles')
    })

    it('should be instanceof jquery', function () {
      equal(
        $('#boxer').prev() instanceof $,
        true)
    })
  })

  describe('call prev twice', function () {
    it('should return div#doberman', function () {
      equal(
        $('#boxer').prev().prev()[0].id,
        'doberman')
    })
  })

  describe('3 elements - call prev 3 times', function () {
    it('should return empty jquery element', function () {
      eql(
        $('#boxer').prev().prev().prev(),
        $([]))
    })
  })
})
