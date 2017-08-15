import noop from '@/utils/func/noop'
import * as storable from './storable'
import * as listenable from './listenable'
import * as configurable from './configurable/configurable'
import * as templatable from './templatable/templatable'

const DATA_NAMESPACE = 'featuresData'

const features = [storable, listenable, configurable, templatable]
  .map(function normalizeFeature(feature) {
    feature = { ...feature }
    if (!feature.proto) {
      feature.proto = {}
    }
    if (!feature.init) {
      feature.init = noop
    }
    if (!feature[destroy]) {
      feature.destroy = noop
    }
    return feature
  })

export function init(instance) {
  instance[DATA_NAMESPACE] = Object.create(null)

  features
    .forEach(function initFeature(feature) {
        feature.init(instance)
    })
}

export function destroy(instance) {
  features
    .forEach(function destroyFeature(feature) {
        feature.destroy(instance)
    })

  delete instance[DATA_NAMESPACE]
}

export const proto = {
  createFeatureData(key) {
    return this[DATA_NAMESPACE][key] = Object.create(null)
  },
  getFeatureData(key) {
    return this[DATA_NAMESPACE][key]
  },
  removeFeatureData(key) {
    const data = this[DATA_NAMESPACE][key]
    delete this[DATA_NAMESPACE][key]
    return data
  }
}

// 混合所有feature提供的原型链上的放啊
features
  .forEach(function mergeProto(feature) {
    Object.assign(proto, feature.proto)
  })