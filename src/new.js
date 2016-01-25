'use strict'

function NEW (ctor, params) {
  var newObject = {}
  ctor.apply(newObject, params)
  newObject.__proto__ = ctor.prototype

  return newObject
}

exports.NEW = NEW

function OBJECT_CREATE (baseObject, props) {
  var Temp = function () {}
  Temp.prototype = baseObject

  return NEW(Temp)
}

exports.OBJECT_CREATE = OBJECT_CREATE
