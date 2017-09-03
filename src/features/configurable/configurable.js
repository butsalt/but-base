import TaskWaiter from './TaskWaiter'
import merge from '@/utils/lang/merge'
import upperCaseFirstLetter from '@/utils/str/upperCaseFirstLetter'
import { isObject } from '@/utils/lang/typeCheck'
import calcDeepDepMap from './calcDeepDepMap'
import calcUpdateOrder from './calcUpdateOrder'

const DATA_NAMESPACE = 'configurable'

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)
  data.taskWaiter = new TaskWaiter(instance)
  // 第一次设置配置时需要合并默认配置
  data.isFirstSet = true
  // 默认的空配置
  data.config = {}

  // 设置更新依赖表
  const depMap  = instance.getUpdateConfigOrder()

  if (depMap) {
    data.depMap = calcDeepDepMap(depMap)
  }
}

export function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE)
}

function getPropertyOrder(property, order) {
  let val = order[property]
  if (val == null) {
    val = -Infinity
  } else {
    val = val.index
  }
  return val
}

export const proto = {
  config(config) {
    const me = this

    const data = me.getFeatureData(DATA_NAMESPACE)
    if (!config) {
      return data.config
    }

    if (data.isFirstSet) {
      data.isFirstSet = false
      config = merge(me.getDefaultConfig(), config)
    }
    data.config = merge(data.config, config)

    let changedKeys
    const depMap = data.depMap
    if (depMap) {
      changedKeys = calcUpdateOrder(config, depMap)
    } else {
      changedKeys = Object.keys(config)
    }

    const taskWaiter = data.taskWaiter
    taskWaiter.reset()

    changedKeys
      .forEach(
        function updateProperty(changedKey) {
          const apiName = 'update' + upperCaseFirstLetter(changedKey)
          if (me[apiName]) {
            // 存在对应的更新方法，等待执行
            taskWaiter.needExec(apiName)
          }
        }
      )

    // 执行所有待执行方法
    taskWaiter.execTasks()

    return me
  },
  getUpdateConfigOrder() {
    return null
  },
  getDefaultConfig() {
    return {

    }
  }
}