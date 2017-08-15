const merge = require('webpack-merge')

const baseWebpackConfig = require('./base')

module.exports = merge(
  baseWebpackConfig,
  {
    devtool: '#cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
    }
  }
)