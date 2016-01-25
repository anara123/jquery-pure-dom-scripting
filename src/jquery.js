'use strict'

module.exports = (function () {
  var $ = function (selector) {}

  $.extend = function (src, dest) {
    for (var prop in dest) {
      if (dest.hasOwnProperty(prop)) {
        src[prop] = dest[prop]
      }
    }

    return src
  }

  $ = $.extend($, {
    isArray: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]'
    },

    isArrayLike: function (obj) {
      if (!('length' in obj) && (typeof obj.length === 'number')) {
        return false
      }

      return (obj.length - 1) in obj
    }
  })

  return $

})()
