const path = require('path')
const fs = require('fs')


exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}