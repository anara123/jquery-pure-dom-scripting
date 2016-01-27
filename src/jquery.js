'use strict'

module.exports = (function () {
  var $ = function (selector) {
    if (!(this instanceof $)) {
      return new $(selector)
    }

    var elements = document.querySelectorAll(selector)
    var _this = this

    $.each(elements, function (i, element) {
      _this[i] = element
    })

    this.length = elements.length
  }

  function getText (elem) {
    if (elem.nodeType === Node.ELEMENT_NODE) {
      var txt = []
      $.each(elem.childNodes, function (i, subElement) {
        txt.push(getText(subElement))
      })
      return txt.join('')

    } else if (elem.nodeType === Node.TEXT_NODE) {
      return elem.textContent
    }
  }

  $.extend = function (src, dest) {
    for (var prop in dest) {
      if (dest.hasOwnProperty(prop)) {
        src[prop] = dest[prop]
      }
    }

    return src
  }

  $.extend($.prototype, {
    html: function (newHtml) {
      if (arguments.length > 0) {
        $.each(this, function (i, elem) {
          elem.innerHTML = newHtml
        })
      } else {
        return this.length > 0 ? this[0].innerHTML : undefined
      }
    },

    val: function (newValue) {
      if (arguments.length > 0) {
        $.each(this, function (i, elem) {
          elem.value = newValue
        })
      } else {
        return this.length ? this[0].value : ''
      }
    },

    text: function (newText) {
      if (arguments.length > 0) {
        this.html('')

        $.each(this, function (i, elem) {
          var textContent = document.createTextNode(newText)
          elem.appendChild(textContent)
        })
      } else {
        return this[0] && getText(this[0])
      }
    }
  })

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
    },

  })

  return $

})()
