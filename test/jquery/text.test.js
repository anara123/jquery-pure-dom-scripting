'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')
var helper = require('../test-helper.js')

describe('jquery#text', function () {
  describe('getting the text of <p> element', function () {
    before(function () {
      helper.setDocument('<p class="p-class">This is p</p>')
    })

    it('should return the text of the first element', function () {
      assert.equal(
        $('.p-class').text(),
        'This is p')
    })
  })

  describe('getting the text of div element which contain single <p>', function () {
    before(function () {
      helper.setDocument('<div class="div-class">text here<p></p></div>')
    })

    it('should return the text of the first element', function () {
      assert.equal(
        $('.div-class').text(),
        'text here')
    })
  })

  describe('getting the text of <div> element which contains multiple <p> elements', function () {
    before(function () {
      helper.setDocument('<div class="div-class">text here<p>Koo1</p><p>Koo2</p><p>Koo3</p></div>')
    })

    it("should return the text of the first <div> element and it's subelements contatinated ", function () {
      assert.equal(
        $('.div-class').text(),
        'text hereKoo1Koo2Koo3')
    })
  })

  describe('setting the text to <div> element', function () {
    it('should set the textValue of the first div element', function () {
      helper.setDocument('<div class="div-class"><p></p></div>')
      $('.div-class').text('text here')

      assert.equal(
        $('.div-class').text(),
        'text here')
    })

    it('should replace the textValue of the first div element', function () {
      helper.setDocument('<div class="div-class">text here<p></p></div>')
      $('.div-class').text('text replaced')

      assert.equal(
        $('.div-class').text(),
        'text replaced')
    })
  })

  afterEach(function () {
    helper.resetDocument()
  })
})
