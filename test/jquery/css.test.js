'use strict'

var assert = require('chai').assert
var equal = assert.equal

var helper = require('../test-helper.js')
var $ = require('../../src/jquery.js')

describe('jquery#css', function () {
  before(function () {
    var innerHTML = [
      '<input id="input-id" style="color:blue;" />',
      '<p style="color:red;"></p>'
    ]

    helper.setDocument(innerHTML)
  })

  after(function () {
    helper.resetDocument()
  })

  describe('css(style_name)', function () {
    it('should return the style value', function () {
      equal(
        $('input').css('color'),
        'blue')
    })
  })

  describe('css(style_name, style_value)', function () {
    it('should set the style_value to the style', function () {
      $('p').css('color', 'white')

      equal(
        $('p').css('color'),
        'white')
    })

    it('should return the element itself', function () {
      equal(
        $('p').css('color', 'green') instanceof $,
        true)
    })
  })

})
