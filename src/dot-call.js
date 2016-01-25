'use strict'

var DOT = require('./dot.js')

function DOT_CALL (obj, propertyName, args) {
  var fn = DOT(obj, propertyName)

  if (fn) {
    return fn.apply(obj, args)
  } else {
    throw 'has no such function'
  }
}

module.exports = DOT_CALL
