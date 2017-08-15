const webpack = require('webpack')
const merge = require('webpack-merge')
const utils = require('../utils')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const baseWebpackConfig = require('./base')

const entry = baseWebpackConfig.entry
const entryNames = Object.keys(entry)
const devEntry = {}

// 每个entry对应的chunk要额外加载一个模块，用于实现热更新
entryNames.forEach(
  name => {
    return devEntry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(entry[name])
  }
)

module.exports = merge(
  baseWebpackConfig,
  {
    entry: devEntry,
    devtool: '#cheap-module-eval-source-map',
    output: {
      filename: '[name].js',
    },
    plugins: [
      // 更友好的编译错误提示
      new FriendlyErrorsPlugin(),
      // 热更新插件
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  }
)