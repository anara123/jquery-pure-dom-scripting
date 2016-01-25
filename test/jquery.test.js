'use strict'

var assert = require('chai').assert

var $ = require('../src/jquery.js')

describe('#proxy', function () {
  function Dog (name) {
    this.name = name
  }

  Dog.prototype.bark = function () {
    return 'bark ' + this.name
  }

  Dog.prototype.kill = function (cats) {
    return 'killed ' + cats + ' cats'
  }

  it('should bind the object to function this', function () {
    var dog = new Dog('foo')
    var speakProxy = $.proxy(dog.bark, dog)

    assert.equal(
      speakProxy(),
      'bark foo')
  })

  it('with param, it should pass the params to the binded function', function () {
    var dog = new Dog('foo')
    var killProxy = $.proxy(dog.kill, dog)

    assert.equal(
      killProxy(4),
      'killed 4 cats')
  })

  it('with static params, it should pass the params when invoked', function () {
    var dog = new Dog('foo')
    var killProxy = $.proxy(dog.kill, dog, [4])

    assert.equal(
      killProxy(),
      'killed 4 cats')
  })
})

describe('#makeArray converts array-like to real array object', function () {
  describe('document.body.childNodes', function () {
    var h1 = document.createElement('h1')
    var h2 = document.createElement('h2')
    document.body.appendChild(h1)
    document.body.appendChild(h2)

    afterEach(function () {
      document.body.removeChild(h1)
      document.body.removeChild(h2)
    })

    it('should make an array', function () {
      var childNodes = document.body.childNodes
      var childArray = $.makeArray(childNodes)

      assert.isFalse($.isArray(childNodes))
      assert.isTrue($.isArray(childArray))

      assert.equal(childArray.length, childNodes.length)

      for (var i = 0; i < childArray.length; i += 1) {
        assert.equal(childArray[i], childNodes[i])
      }
    })
  })

  describe('document.getElementsByTagName(*)', function () {
    var h1 = document.createElement('h1')
    var h2 = document.createElement('h2')
    document.body.appendChild(h1)
    document.body.appendChild(h2)

    afterEach(function () {
      document.body.removeChild(h1)
      document.body.removeChild(h2)
    })

    it('should make an array', function () {
      var childNodes = document.getElementsByTagName('*')
      var childArray = $.makeArray(childNodes)

      assert.isFalse($.isArray(childNodes))
      assert.isTrue($.isArray(childArray))

      assert.equal(childArray.length, childNodes.length)

      for (var i = 0; i < childArray.length; i += 1) {
        assert.equal(childArray[i], childNodes[i])
      }
    })
  })

  describe('arguments', function () {
    it('should make an array', function () {
      (function () {
        var argumentsArray = $.makeArray(arguments)

        assert.isFalse($.isArray(arguments))
        assert.isTrue($.isArray(argumentsArray))

        assert.equal(argumentsArray.length, 2)

        for (var i = 0; i < argumentsArray.length; i += 1) {
          assert.equal(argumentsArray[i], arguments[i])
        }

      })('first', 'second')
    })
  })

  it('should return the object itself withot chaing it', function () {
    var obj = { koo: 'koo' }
    assert.throws(function () {
      $.makeArray(obj)
    })
  })
})

describe('#each', function () {
  it('should loop over array', function () {
    var collection = ['a', 'b']
    $.each(collection, function (index, value) {
      if (index === 0) {
        assert.equal(value, 'a')
      } else if (index === 1) {
        assert.equal(value, 'b')
      } else {
        assert.isTrue(false)
      }
    })
  })

  it('should iterate over object property', function () {
    var obj = { foo: 'foo1', moo: 'moo1' }

    $.each(obj, function (prop, value) {
      if (prop === 'foo') {
        assert.equal(value, 'foo1')
      } else if (prop === 'moo') {
        assert.equal(value, 'moo1')
      } else {
        assert.isTrue(false)
      }
    })
  })
})

describe('#isArray', function () {
  it('should return true when array passed', function () {
    assert.isTrue($.isArray([]))
    assert.isTrue($.isArray(new Array(5, 3)))

  })

  it('should return false if object passed', function () {
    assert.isFalse($.isArray(arguments))
    assert.isFalse($.isArray(55))
    assert.isFalse($.isArray({ koo: 'koo' }))
  })
})

describe('#isArrayLike', function () {
  describe('for <div> element', function () {
    var div = document.createElement('div')
    div.appendChild(document.createElement('h1'))
    div.appendChild(document.createElement('h2'))
    document.body.appendChild(div)

    afterEach(function () {
      document.body.removeChild(div)
    })

    it('should return true', function () {
      assert.isTrue($.isArrayLike(document.getElementsByTagName('div')))
    })

  })

  describe('for <ul> element', function () {
    var ul = document.createElement('ul')
    ul.appendChild(document.createElement('li'))
    ul.appendChild(document.createElement('li'))
    document.body.appendChild(ul)

    it('should return true', function () {
      assert.isTrue($.isArrayLike(document.getElementsByTagName('ul')))
    })

    afterEach(function () {
      document.body.removeChild(ul)
    })
  })

  it('should return on arguments', function (done) {
    assert.isTrue($.isArrayLike(arguments))
    done() // I need done only to arguments not to be null
  })
})

describe('what?', function () {})

describe('jquery test', function () {
  describe('create instance', function () {
    it('should return object', function () {})
  })

  describe('#extend', function () {
    it('should add new property when not exist on src object', function () {
      var src = { moo: 'moo' }
      var extension = { koo: 'koo' }

      assert.deepEqual(
        $.extend(src, extension),
        { moo: 'moo', koo: 'koo' })
    })

    it('should override existing property on src object', function () {
      var src = { moo: 'moo' }
      var extension = { moo: 'koo' }

      assert.deepEqual(
        $.extend(src, extension),
        { moo: 'koo'})
    })
  })

})
