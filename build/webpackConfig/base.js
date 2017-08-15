const utils = require('../utils')

module.exports = {
  // 入口
  entry: {
    ButBase: utils.resolve('src/ButBase')
  },
  output: {
    // 用于存放编译后文件的文件夹
    path: utils.resolve('dist')
  },
  resolve: {
    alias: {
      // 实现用import '@/'来从src文件夹开始定位
      '@': utils.resolve('src')
    }
  },
  module: {
    rules: [
      // js文件使用babel-loader编译
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  }
}