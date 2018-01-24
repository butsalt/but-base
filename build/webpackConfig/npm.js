const webpack = require('webpack')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./base')

module.exports = merge(
  baseWebpackConfig,
  {
    output: {
      filename: '[name].js',
      library: '[name]',
      libraryTarget: 'umd'
    }
  }
)