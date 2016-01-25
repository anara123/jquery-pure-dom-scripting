'use strict'

var assert = require('chai').assert

var $ = require('../src/jquery.js')

describe('#isArray', function () {
  it('should return true when array passed', function () {
    assert.isTrue($.isArray([]))
    assert.isTrue($.isArray(new Array(5, 3)))

  })

  it('should return false if object passed', function () {
    assert.isFalse($.isArray(arguments))
    assert.isFalse($.isArray(55))
    assert.isFalse($.isArray({ koo: 'koo' }))
  })
})

describe('#isArrayLike', function () {
  it('should return true on <div>', function () {
    var div = document.createElement('div')
    div.appendChild(document.createElement('h1'))
    div.appendChild(document.createElement('h2'))
    document.body.appendChild(div)

    assert.isTrue($.isArrayLike(document.getElementsByTagName('div')))
  })

  it('should return true on <li>', function () {
    var ul = document.createElement('ul')
    ul.appendChild(document.createElement('li'))
    ul.appendChild(document.createElement('li'))
    document.body.appendChild(ul)

    assert.isTrue($.isArrayLike(document.getElementsByTagName('ul')))
  })

  it('should return on arguments', function (done) {
    assert.isTrue($.isArrayLike(arguments))
    done() // I need done only to arguments not to be null
  })
})

describe('what?', function () {})

describe('jquery test', function () {
  describe('create instance', function () {
    it('should return object', function () {})
  })

  describe('#extend', function () {
    it('should add new property when not exist on src object', function () {
      var src = { moo: 'moo' }
      var extension = { koo: 'koo' }

      assert.deepEqual(
        $.extend(src, extension),
        { moo: 'moo', koo: 'koo' })
    })

    it('should override existing property on src object', function () {
      var src = { moo: 'moo' }
      var extension = { moo: 'koo' }

      assert.deepEqual(
        $.extend(src, extension),
        { moo: 'koo'})
    })
  })

})
