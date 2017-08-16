import * as features from './features/features'

export default class BaseComponent {
  constructor(config={}) {
    const me = this

    me.init()

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
  init() {
    const me = this

    me.beforeInit()

    // 初始化所有功能
    features.init(me)

    me.inited()
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
  BaseComponent.prototype,
  features.proto
)