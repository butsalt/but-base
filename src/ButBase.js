import * as features from './features/features'
import merge from '@/utils/lang/merge'
import statics from './statics/statics'

export default class ButBase {
  constructor(config) {
    this.init(config)
  }
  init(config) {
    if (config == null) {
      config = {}
    }
    const me = this

    me.beforeInit()

    // 初始化所有功能
    features.init(me)

    const initConfig = me.inited() || {}

    config = merge(initConfig, config)

    // 初始化完毕，主动调用api

    // 获取挂载点
    const el = config.el
    delete config.el

    // 首次设置配置
    me.config(config)

    if (el) {
      // 存在挂载点就挂载
      me.mountTo(el)
    }
  }
  beforeInit() {

  }
  inited() {

  }
  destroy() {
    const me = this

    me.beforeDestroy()

    features.destroy(me)

    me.destroyed()
  }
  beforeDestroy() {

  }
  destroyed() {

  }
}

Object.assign(
  ButBase.prototype,
  features.proto
)

statics(ButBase)