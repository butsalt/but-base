const webpack = require('webpack')
const merge = require('webpack-merge')

const config = require('../config')

const baseWebpackConfig = require('./base')


module.exports = merge(
  baseWebpackConfig,
  {
    devtool: '#source-map',
    output: {
      filename: '[name].min.js',
      library: '[name]',
      libraryTarget: 'umd'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      })
    ]
  }
)