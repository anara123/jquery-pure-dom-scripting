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

      if (typeof obj.length === 'number') {
        if (obj.length === 0) {
          return true
        } else {
          return (obj.length - 1) in obj
        }
      } else {
        return false
      }

      return (obj.length - 1) in obj
    },

    each: function (collection, callback) {
      if ($.isArrayLike(collection)) {
        for (var i = 0; i < collection.length; i += 1) {
          callback(i, collection[i])
        }
      }
      else if (typeof collection === 'object') {
        for (var prop in collection) {
          if (collection.hasOwnProperty(prop)) {
            callback(prop, collection[prop])
          }
        }
      }

      return collection
    },

    makeArray: function (collection) {
      if ($.isArray(collection)) {
        return collection
      } else if ($.isArrayLike(collection)) {
        var arr = []
        $.each(collection, function (i, value) {
          arr.push(value)
        })
        return arr
      } else {
        throw 'not an array-like'
      }
    },

    proxy: function (fn, context, args) {
      args = args || []
      return function () {
        $.each(arguments, function (i, arg) {
          args.push(arg)
        })
        return fn.apply(context, args)
      }
    }
  })

  return $

})()
