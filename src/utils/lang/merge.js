import { isObject } from './typeCheck'

const dataReg = /[dD]ata/
export default function merge (target, src) {
  if (target == null) {
    return src
  }
  const srcKeys = Object.keys(src)
  srcKeys
    .forEach(
      function (srcKey) {
        const srcVal = src[srcKey]
        const targetVal = target[srcKey]
        if (
          isObject(targetVal)
          && isObject(srcVal)
          && !dataReg.test(srcKey)
        ) {
          merge(targetVal, srcVal)
        } else {
          target[srcKey] = srcVal
        }
      }
    )
  return target
}