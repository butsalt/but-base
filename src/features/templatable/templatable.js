import unwrap from './unwrap'
import noop from '@/utils/func/noop'
import parse from '@/utils/dom/parse'

const DATA_NAMESPACE = 'templatable'

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)

  data.el = null

  // 解析模板成DOM
  const elStr = instance.getTemplate()
  if (elStr != null) {
    data.el = parse(elStr)
  }
}

export function destroy(instance) {
  // 从文档流中卸载
  instance.unmount()

  instance.removeFeatureData(DATA_NAMESPACE)
}

export const proto = {
  getTemplate: noop,
  mountTo(container) {
    const me = this

    const el = me.getEl()

    unwrap(container).appendChild(el)
  },
  unmount() {
    const me = this

    const el = me.getEl()

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