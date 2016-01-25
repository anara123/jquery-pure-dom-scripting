'use strict'

function DOT (obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    return obj[prop]
  }

  if (obj.__proto__) {
    return DOT(obj.__proto__, prop)
  } else {
    return undefined
  }

}

module.exports = DOT
