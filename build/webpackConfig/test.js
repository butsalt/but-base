const merge = require('webpack-merge')

const baseWebpackConfig = require('./base')
const utils = require('../utils')

module.exports = merge(
  baseWebpackConfig,
  {
    resolve: {
      alias: {
        'but-base': utils.resolve('src/ButBase.js')
      }
    },
    devtool: '#cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
    }
  }
)