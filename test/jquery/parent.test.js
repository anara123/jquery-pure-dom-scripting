'use strict'

var assert = require('chai').assert
var equal = assert.equal
var eql = assert.deepEqual

var helper = require('../test-helper.js')
var $ = require('../../src/jquery.js')

describe('jquery#parent', function () {
  before(function () {
    var html = [
      '<div id="dogs">',

      '<div id="doberman">',
      '<p class="p-class-1"></p><p class="p-class-1"></p><p class="p-class-1"></p>',
      '</div>',

      '<div id="beagles">',
      '<p class="p-class-1"></p><p class="p-class-2"></p><p class="p-class-2"></p>',
      '</div>', // close div#beagles

      '</div>' // close div#parent
    ]

    helper.setDocument(html)
  })

  after(function () {
    helper.resetDocument()
  })

  describe('call parent once', function () {
    it('should return parent element [div#doberman]', function () {
      equal(
        $('p-class-2').parent()[0].id,
        'beagles')
    })

    it('should be instanceof jquery', function () {
      equal(
        $('p-class-2').parent() instanceof $,
        true)

    })

    it('should have length of 1', function () {
      equal(
        $('p-class-2').parent().length,
        1)
    })
  })

  describe('when call parent twice', function () {
    it('should return grandparent element [div#dogs]', function () {
      equal(
        $('p-class-2').parent().parent()[0].id,
        'dogs')
    })
  })

  describe('when elements have multiple parents', function () {
    it('should return multiple elements [div#doberman div#beagles]', function () {
      var parents = $('p-class-1').parent()

      equal(
        parents[0].id,
        'doberman')

      equal(
        parents[1].id,
        'beagles')
    })
  })

})
