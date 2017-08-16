process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')

const utils = require('./utils')

const webpackConfigs = [
  // 未压缩版
  require('./webpackConfig/npm'),
  // 压缩版
  require('./webpackConfig/prod')
]

function compile(webpackConfigs) {
  const tasks = webpackConfigs
    .map(webpackConfig => {
      return new Promise(
        (resolve, reject) => {
          webpack(
            webpackConfig,
            err => {
              if (err) {
                reject(err)
              } else {
                resolve()
              }
            }
          )
        }
      )
    })
  return Promise.all(tasks)
}

const spinner = ora('项目构建中...')
spinner.start()

// 删除上次构建产出的文件
rm(
  utils.resolve('dist'),
  err => {
    if (err) {
      throw err
    }
    compile(webpackConfigs)
      .then(
        () => {
          spinner.stop()
          console.log(chalk.cyan('  构建完成。\n'))
        }
      )
  }
)