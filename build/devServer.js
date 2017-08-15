process.env.NODE_ENV = 'development'

const express = require('express')
const webpack = require('webpack')

const config = require('./config')

const port = config.dev.port

const webpackConfig = require('./webpackConfig/dev')
const compiler = webpack(webpackConfig)

const app = express()

// 使得编译结果直接保存在内存中，而不是输出到磁盘
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

app.use(devMiddleware)

// 当资源发生变更时进行热更新
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})

app.use(hotMiddleware)

const uri = 'http://localhost:' + port
devMiddleware.waitUntilValid(() => {
  // 当服务器启动完成后，在命令行窗口进行提示
  console.log(`> 监听于 ${uri} \n`)
  console.log('> 以下地址有效：')
  let addressList = ''
  Object.keys(webpackConfig.entry)
    .forEach((appName) => {
      addressList += `  ${uri}/${appName}.html\n`
    })
  console.log(addressList)
})

app.listen(port)