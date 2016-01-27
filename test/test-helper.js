'use strict'

var jsdom = require('jsdom')
var fs = require('fs')
var util = require('util')
var html = fs.readFileSync('./test/test.html', 'utf-8')

// setup the simplest document possible
var doc = jsdom.jsdom(html)

// get the window object out of the document
var win = doc.defaultView

// set globals for mocha that make access to document and window feel 
// natural in the test environment
global.document = doc
global.window = win

// take all properties of the window object and also attach it to the 
// mocha global object
propagateToGlobal(win)

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
  for (var key in window) {
    if (!window.hasOwnProperty(key)) continue
    if (key in global) continue

    global[key] = window[key]
  }
}

exports.setDocument = function (html) {
  var baseHtml = '<!doctype html><html><body>%s</body></html>'
  var formattedHtml = util.format(baseHtml, html)
  // console.log('1######', formattedHtml)
  global.document = jsdom.jsdom(formattedHtml)
}

exports.resetDocument = function () {
  global.document = doc
}
