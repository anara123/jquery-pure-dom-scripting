'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#makeArray converts array-like to real array object', function () {
  describe('document.body.childNodes', function () {
    before(function () {
      var h1 = document.createElement('h1')
      var h2 = document.createElement('h2')
      document.body.appendChild(h1)
      document.body.appendChild(h2)
    })

    it('should make an array', function () {
      var childNodes = document.body.childNodes
      var childArray = $.makeArray(childNodes)

      assert.isFalse($.isArray(childNodes))
      assert.isTrue($.isArray(childArray))

      assert.equal(childArray.length, childNodes.length)

      for (var i = 0; i < childArray.length; i += 1) {
        assert.equal(childArray[i], childNodes[i])
      }
    })
  })

  describe('document.getElementsByTagName(*)', function () {
    before(function () {
      var h1 = document.createElement('h1')
      var h2 = document.createElement('h2')
      document.body.appendChild(h1)
      document.body.appendChild(h2)
    })

    it('should make an array', function () {
      var childNodes = document.getElementsByTagName('*')
      var childArray = $.makeArray(childNodes)

      assert.isFalse($.isArray(childNodes))
      assert.isTrue($.isArray(childArray))

      assert.equal(childArray.length, childNodes.length)

      for (var i = 0; i < childArray.length; i += 1) {
        assert.equal(childArray[i], childNodes[i])
      }
    })
  })

  describe('arguments', function () {
    it('should make an array', function () {
      (function () {
        var argumentsArray = $.makeArray(arguments)

        assert.isFalse($.isArray(arguments))
        assert.isTrue($.isArray(argumentsArray))

        assert.equal(argumentsArray.length, 2)

        for (var i = 0; i < argumentsArray.length; i += 1) {
          assert.equal(argumentsArray[i], arguments[i])
        }

      })('first', 'second')
    })
  })

  it('should return the object itself withot chaing it', function () {
    var obj = { koo: 'koo' }
    assert.deepEqual(
      $.makeArray(obj),
      [ obj ])
  })

  afterEach(function () {
    $.each(document.body.childNodes, function (i, node) {
      document.body.removeChild(node)
    })
  })
})
