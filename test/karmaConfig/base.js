process.env.NODE_ENV = 'test'

module.exports = {
  frameworks: ['jasmine'],
  files: [
    '../index.js'
  ],
  preprocessors: {
    '../index.js': ['webpack', 'sourcemap']
  },
  webpack: require('../../build/webpackConfig/test'),
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    'karma-jasmine',
    'karma-sourcemap-loader',
    'karma-webpack'
  ]
}