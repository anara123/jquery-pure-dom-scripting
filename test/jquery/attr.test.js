'use strict'

var assert = require('chai').assert
var equal = assert.equal

var helper = require('../test-helper.js')
var $ = require('../../src/jquery.js')

describe('jquery#attr', function () {
  before(function () {
    var innerHTML = [
      '<input id="input-id" />',
      '<div>Hello Div</div>'
    ]

    helper.setDocument(innerHTML)
  })

  after(function () {
    helper.resetDocument()
  })

  describe('set new attr to an element', function () {
    it('should create/edit the attribute of an element', function () {
      $('div').attr('class', 'div-class')

      equal(
        $('div').attr('class'),
        'div-class')
    })
  })

  describe('get value of attr by attrName', function () {
    it('should return all the attributes', function () {
      equal(
        $('input').attr('id'),
        'input-id')
    })
  })
})
