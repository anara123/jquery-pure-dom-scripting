'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#isArrayLike', function () {
  describe('for <div> element', function () {
    before(function () {
      var div = document.createElement('div')
      div.appendChild(document.createElement('h1'))
      div.appendChild(document.createElement('h2'))
      document.body.appendChild(div)
    })

    afterEach(function () {
      $.each(document.body.childNodes, function (i, node) {
        document.body.removeChild(node)
      })
    })

    it('should return true', function () {
      assert.isTrue($.isArrayLike(document.getElementsByTagName('div')))
    })

  })

  describe('for <ul> element', function () {
    before(function () {
      var ul = document.createElement('ul')
      ul.appendChild(document.createElement('li'))
      ul.appendChild(document.createElement('li'))
      document.body.appendChild(ul)
    })

    it('should return true', function () {
      assert.isTrue($.isArrayLike(document.getElementsByTagName('ul')))
    })

    afterEach(function () {
      $.each(document.body.childNodes, function (i, node) {
        document.body.removeChild(node)
      })
    })
  })

  it('should return on arguments', function (done) {
    assert.isTrue($.isArrayLike(arguments))
    done() // I need done only to arguments not to be null
  })
})
