const base = require('./base')

module.exports = function (config) {
  config.set(
    Object.assign(base, {
      browsers: ['Chrome'],
      reporters: ['progress'],
      singleRun: true,
      plugins: base.plugins.concat([
        'karma-chrome-launcher'
      ])
    })
  )
}