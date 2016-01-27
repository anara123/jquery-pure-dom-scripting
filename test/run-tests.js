'use strict'

require('babel-register')

var Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path')
  // testHelper = require('./test-helper')

// Instantiate a Mocha instance.
var mocha = new Mocha()

var testDir = './test/'

// Add each .js file to the mocha instance
fs.readdirSync(testDir).filter(function (file) {
  // Only keep the .js files
  return file.substr(-11) === '.test.js'

}).forEach(function (file) {
  mocha.addFile(
    path.join(testDir, file)
  )
})

// Run the tests.
mocha.run(function (failures) {
  process.on('exit', function () {
    process.exit(failures)
  })
})
