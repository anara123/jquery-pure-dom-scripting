'use strict'

var assert = require('chai').assert

var $ = require('../../src/jquery.js')

describe('jquery#html create a jquery item by selector', function () {
  before(function () {
    var h11 = document.createElement('h1')
    h11.className = 'koo'

    var h12 = document.createElement('h2')
    h12.className = 'koo'

    document.body.appendChild(h11)
    document.body.appendChild(h12)
  })

  after(function () {
    $.each(document.body.childNodes, function (i, node) {
      document.body.removeChild(node)
    })
  })

  it('#html should set html of all the nodes', function () {
    var kooSelectors = new $('.koo')
    kooSelectors.html('Hello Koo')
    assert.equal(
      kooSelectors.html(),
      'Hello Koo')
  })

  it('#html without parameters, should return innerHTML of the first node', function () {})
})
