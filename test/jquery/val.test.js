'use strict'

var assert = require('chai').assert
var jsdom = require('jsdom')

var helper = require('../test-helper.js')

var $ = require('../../src/jquery.js')

describe('jquery#val', function () {
  describe('setting value of the input tag', function () {
    before(function () {
      helper.setDocument('<input class="in"/>')
    })

    it('should set the value of the input', function () {
      $('.in').val('loo')

      assert.equal(
        $('.in').val(),
        'loo')
    })
  })

  describe('read value of the input tag', function () {
    before(function () {
      helper.setDocument('<input class="in" value="moo">')
    })

    it('should set the value of the input', function () {
      assert.equal(
        $('.in').val(),
        'moo')
    })
  })

  afterEach(function () {
    helper.resetDocument()
  })
})
