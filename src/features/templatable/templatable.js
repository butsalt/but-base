import getFinder from './getFinder'
import wrap from './wrap'
import unwrap from './unwrap'
import noop from '@/utils/func/noop'

const DATA_NAMESPACE = 'templatable'

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)

  // 解析模板成DOM
  const elStr = instance.getTemplate()
  let el = ($.parseHTML(elStr))[0]

  const wrapper = instance.getTemplateWrapper()

  // 根据需要将DOM进行封装
  data.el = wrap(el, wrapper)
  // 装载合适的finder，用于查找el下的子孙元素
  data.finder = getFinder(wrapper)
  // 用于保存所有子孙元素查找结果
  data.selectionMap = Object.create(null)
}

export function destroy(instance) {
  // 从文档流中卸载
  instance.unmount()

  const { el } = instance.removeFeatureData(DATA_NAMESPACE)
}

export const proto = {
  getTemplate: noop,
  getTemplateWrapper: noop,
  find(selector) {
    const me = this
    const el = me.getEl()
    const { selectionMap, finder } = me.getFeatureData(DATA_NAMESPACE)
    if (selectionMap[selector]) {
      return selectionMap[selector]
    }
    const selection = finder(el, selector)
    selectionMap[selector] = selection
    return selection
  },
  mountTo(container) {
    const me = this

    const el = unwrap(me.getEl())

    unwrap(container).appendChild(el)
  },
  unmount() {
    const me = this

    const el = unwrap(me.getEl())

    const parentEl = el.parentElement
    if (parentEl) {
      parentEl.removeChild(el)
    }
  },
  getEl() {
    const me = this
    return me.getFeatureData(DATA_NAMESPACE).el
  }
}