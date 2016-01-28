'use strict'

module.exports = (function () {
  var _REGEX_ID_SELECTOR = '#'
  var _REGEX_QUERY_SELECTOR = '.'

  var $ = function (selector) {
    if (!(this instanceof $)) {
      return new $(selector)
    }

    var elements = []
    if (typeof selector === 'string') {
      var selectors = selector.split(',')

      $.each(selectors, function (i, s) {
        if (s.charAt(0) === _REGEX_ID_SELECTOR) {
          elements.push(document.getElementById(s.substring(1)))
        } else if (s.charAt(0) === _REGEX_QUERY_SELECTOR) {
          Array.prototype.push.apply(elements, document.querySelectorAll(s))
        } else {
          Array.prototype.push.apply(elements, document.getElementsByTagName(s))
        }
      })

    } else if ($.isArray(selector) || $.isArrayLike(elements)) {
      elements = selector
    } else {
      elements = $.makeArray(selector)
    }

    var _this = this
    $.each(elements, function (i, element) {
      _this[i] = element
    })

    this.length = elements.length
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
    },

    find: function (selectors) {
      if (!$.isArray(selectors)) {
        selectors = [selectors]
      }

      var collection = []
      $.each(this, function (i, elem) {
        $.each(selectors, function (j, selector) {
          var result = elem.querySelectorAll(selector)
          if (result && result.length > 0) {
            $.each(result, function (k, foundElem) {
              collection.push(foundElem)
            })
          }
        })
      })

      return $(collection)
    },

    next: makeTraverser(
      function () {
        var current = this.nextSibling

        while (current && current.nodeType === Node.TEXT_NODE) {
          current = current.nextSibling
        }

        if (current) {
          return current
        }
      }),

    prev: makeTraverser(
      function () {
        var current = this.previousSibling

        while (current && current.nodeType === Node.TEXT_NODE) {
          current = current.previousSibling
        }

        if (current) {
          return current
        }
      }),

    parent: makeTraverser(
      function () {
        return this.parentNode
      }),

    children: makeTraverser(
      function () {
        return this.children
      }),

    attr: function (attrName, value) {
      if (arguments.length > 1) {
        $.each(this, function (i, el) {
          el.setAttribute(attrName, value)
        })
      } else if (arguments.length === 1) {
        return this[0] && this[0].getAttribute(attrName)
      }
    },

    css: function (styleName, value) {
      if (arguments.length > 1) {
        $.each(this, function (i, el) {
          el.style[styleName] = value
        })

        return this
      } else if (arguments.length === 1) {
        return this[0] && document.defaultView
          .getComputedStyle(this[0])
          .getPropertyValue(styleName)

      }
    }
  })

  $ = $.extend($, {
    isArray: function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]'
    },

    isArrayLike: function (obj) {
      if (!('length' in obj) && (typeof obj.length !== 'number')) {
        return false
      }

      if (obj.length === 0) {
        return true
      } else {
        return (obj.length - 1) in obj
      }
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

    contains: function (collection, item) {
      for (var i = 0; i < collection.length; i += 1) {
        var elem = collection[i]
        if (item === elem) {
          return true
        }
      }

      return false
    },

    makeArray: function (collection) {
      if (!collection) {
        return []
      }

      if ($.isArray(collection)) {
        return collection
      } else if ($.isArrayLike(collection)) {
        var arr = []
        $.each(collection, function (i, value) {
          arr.push(value)
        })
        return arr
      } else {
        return [collection]
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

  function makeTraverser (fn) {
    return function () {
      var elements = []
      var args = arguments

      $.each(this, function (i, el) {
        var result = fn.apply(el, args)
        if (result && !$.contains(elements, result)) {
          elements.push(result)
        }
      })

      return $(elements)
    }
  }

})()
