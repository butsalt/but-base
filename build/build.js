process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const chalk = require('chalk')
const webpack = require('webpack')

const utils = require('./utils')

const webpackConfig = require('./webpackConfig/prod')

const spinner = ora('项目构建中...')
spinner.start()

// 删除上次构建产出的文件
rm(
  utils.resolve('dist'),
  err => {
    if (err) {
      throw err
    }
    webpack(
      webpackConfig,
      (err, stats) => {
        spinner.stop()
        if (err) {
          throw err
        }
        // 输出构建结果
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        console.log(chalk.cyan('  构建完成。\n'))
      }
    )
  }
)