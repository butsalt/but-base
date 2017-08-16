const base = require('./base')

module.exports = function (config) {
  config.set(
    Object.assign(base, {
      browsers: ['Chrome'],
      reporters: ['progress'],
      plugins: base.plugins.concat([
        'karma-chrome-launcher'
      ])
    })
  )
}