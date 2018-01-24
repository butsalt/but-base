const merge = require('webpack-merge')

const baseWebpackConfig = Object.assign({}, require('./base'))
const utils = require('../utils')

module.exports = merge(
  baseWebpackConfig,
  {
    // entry由karma-webpack管理
    entry: null,
    // output由karma-webpack管理
    output: null,
    resolve: {
      alias: {
        // 使得可以在单元测试中可以require('but-base')
        'but-base': utils.resolve('src/index.js')
      }
    },
    devtool: '#cheap-module-eval-source-map'
  }
)