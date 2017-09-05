import noop from '@/utils/func/noop'

export const proto = {
  enable(funcName) {
    delete this[funcName]
  },
  disable(funcName) {
    this[funcName] = noop
  }
}