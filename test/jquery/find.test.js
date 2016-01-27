'use strict'

var assert = require('chai').assert
var equal = assert.equal
var deepEqual = assert.deepEqual

var helper = require('../test-helper.js')

var $ = require('../../src/jquery.js')

describe('jquery#find', function () {
  before(function () {
    var innerHTML = [
      '<div class="div-class">',
      '<p class="p-class"></p><p class="p-class"></p>',
      '<h1 class="h1-class"></h1>',
      '<h2 class="h2-class"></h2>',
      '</div>',

      '<div class="div-mult">',
      '<p class="p-class"></p><p class="p-class"></p>',
      '</div>',

      '<div class="div-mult">',
      '<p class="p-class"></p>',
      '</div>'
    ].join('')

    helper.setDocument(innerHTML)
  })

  after(function () {
    helper.resetDocument()
  })

  describe('by single tag', function () {
    it('should return all the elements of that tag type inside of jquery elements', function () {
      var queryResult = $('.div-class').find('.p-class')

      assert.equal(
        queryResult instanceof $,
        true)

      assert.equal(
        queryResult.length,
        2)

      assert.equal(
        queryResult[0].tagName,
        'P')
    })
  })

  describe('by single tag inside jquery multiple elements', function () {
    it('should find and concat all the elements into single jquery object', function () {
      var queryResult = $('.div-mult').find('.p-class')

      assert.equal(
        queryResult.length,
        3)

      assert.equal(
        queryResult[0].tagName,
        'P')
    })
  })

  describe('by array of tags', function () {
    it('should return all the subelements of that types', function () {
      var queryResult = $('.div-class').find(['.p-class', '.h1-class'])

      assert.equal(
        queryResult instanceof $,
        true)

      assert.equal(
        queryResult.length,
        3)

      assert.equal(
        queryResult[0].tagName,
        'P')

      assert.equal(
        queryResult[2].tagName,
        'H1')

    })
  })
})
