const DATA_NAMESPACE = 'storable'

export function init(instance) {
  instance.createFeatureData(DATA_NAMESPACE)
}

export function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE)
}

export const proto = {
  data(key, val) {
    const me = this
    const data = me.getFeatureData(DATA_NAMESPACE)
    if (arguments.length === 1) {
      return data[key]
    }
    data[key] = val
    return me
  },
  removeData(key) {
    const me = this
    const data = me.getFeatureData(DATA_NAMESPACE)
    const deletedVal = data[key]
    delete data[key]
    return deletedVal
  }
}