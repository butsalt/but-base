import TaskWaiter from './TaskWaiter'
import merge from '@/utils/lang/merge'
import upperCaseFirstLetter from '@/utils/str/upperCaseFirstLetter'
import nvl from '@/utils/lang/nvl'

const DATA_NAMESPACE = 'configurable'

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)
  data.taskWaiter = new TaskWaiter(instance)
  // 第一次设置配置时需要合并默认配置
  data.isFirstSet = true
  // 默认的空配置
  data.config = {}
}

export function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE)
}

function getPropertyOrder(property, order) {
  return nvl(order[property], -Infinity)
}

export const proto = {
  config(config) {
    const me = this

    if (!config) {
      return me.getFeatureData(DATA_NAMESPACE).config
    }

    const data = me.getFeatureData(DATA_NAMESPACE)

    if (data.isFirstSet) {
      data.isFirstSet = false
      config = merge(me.getDefaultConfig(), config)
    }
    data.config = merge(data.config, config)

    const changedPropertyKeys = Object.keys(config)
    const order = me.getUpdateConfigOrder()
    if (order) {
      changedPropertyKeys
        .sort((key1, key2) => {
          const order1 = getPropertyOrder(key1, order)
          const order2 = getPropertyOrder(key2, order)
          return order1 - order2
        })
    }

    const taskWaiter = data.taskWaiter
    taskWaiter.reset()

    changedPropertyKeys
      .forEach(
        function updateProperty(changedPropertyKey) {
          const apiName = 'update' + upperCaseFirstLetter(changedPropertyKey)
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