import merge from '@/utils/lang/merge'
import upperCaseFirstLetter from '@/utils/str/upperCaseFirstLetter'
import { isObject } from '@/utils/lang/typeCheck'
import calcDeepDepMap from './calcDeepDepMap'
import calcDescendantMap from './calcDescendantMap'
import calcFullTaskMap from './calcFullTaskMap'
import calcExecOrder from './calcExecOrder'

const DATA_NAMESPACE = 'configurable'

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)
  // 第一次设置配置时需要合并默认配置
  data.isFirstSet = true
  // 默认的空配置
  data.config = {}

  // 设置更新依赖表
  const depMap  = instance.getExecOrder()

  if (depMap) {
    const deepDepMap = data.depMap = calcDeepDepMap(depMap)
    data.descendantMap = calcDescendantMap(deepDepMap)
  }
}

export function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE)
}

export const proto = {
  config(config, silent) {
    const me = this

    const data = me.getFeatureData(DATA_NAMESPACE)
    if (!config) {
      return data.config
    }

    if (silent === true) {
      me.disable('fire')
    }

    if (data.isFirstSet) {
      data.isFirstSet = false
      config = merge(me.getDefaultConfig(), config)
    }
    data.config = merge(data.config, config)

    const taskMap = Object.create(null)
    Object.keys(config)
      .forEach(key => {
        taskMap['update' + upperCaseFirstLetter(key)] = true
      })
    let tasks
    const depMap = data.depMap
    if (depMap) {
      tasks = calcExecOrder(
        calcFullTaskMap(taskMap, data.descendantMap),
        depMap
      )
    } else {
      tasks = Object.keys(taskMap)
    }

    tasks
      .forEach(apiName => {
        if (me[apiName]) {
          me[apiName]()
        }
      })


    if (silent === true) {
      me.enable('fire')
    }

    return me
  },
  getExecOrder() {
    return null
  },
  getDefaultConfig() {
    return {

    }
  }
}