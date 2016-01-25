'use strict'

function INSTANCEOF (obj, clazz) {
  if (!(typeof clazz === 'function')) {
    throw 'TypeError must be function'
  }

  return (function (o, klass) {
    if (!o.__proto__) {
      return false
    } else if (o.__proto__ === klass.prototype) {
      return true
    } else {
      return INSTANCEOF(o.__proto__, klass)
    }
  })(obj, clazz)
}

module.exports = INSTANCEOF
