/**
 * @Author:      孙雨珩
 * @DateTime:    2017-07-31 14:24:36
 * @Description: 使得组件实例能设置config，当config属性变化时自动调用相应update方法
 * @Last Modified By:   孙雨珩
 * @Last Modified Time:    2017-08-31 12:21:13
 */

import TaskWaiter from './TaskWaiter'
import merge from '@/utils/lang/merge'
import upperCaseFirstLetter from '@/utils/str/upperCaseFirstLetter'
import { isObject } from '@/utils/lang/typeCheck'

const DATA_NAMESPACE = 'configurable'

function walk(tree, index, map, childKeys) {
  for (let key in tree) {
    const item = map[key] = {
      index: index++,
      childKeys: []
    }
    if (childKeys) {
      // 这个key是tree对应属性的childKey
      childKeys.push(key)
    }
    const val = tree[key]
    if (isObject(val)) {
      index = walk(val, index, map, item.childKeys)
      // tree下所有属性的childKey是tree对应属性的childKey
      childKeys.push.apply(childKeys, item.childKeys)
    }
  }
  return index
}

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)
  data.taskWaiter = new TaskWaiter(instance)
  // 第一次设置配置时需要合并默认配置
  data.isFirstSet = true
  // 默认的空配置
  data.config = {}

  // 设置顺序表
  const orderTree = data.orderTree = instance.getUpdateConfigOrder()

  if (orderTree) {
    const orderMap = data.orderMap = Object.create(null)
    walk(orderTree, 0, orderMap, [])
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
    const orderMap = data.orderMap
    if (orderMap) {
      const changedKeyMap = Object.create(null)
      const sourceKeys = []
      for (let key in config) {
        changedKeyMap[key] = true
        sourceKeys.push(key)
      }
      // 如果存在orderMap中有的key，那么在这个key的所有后代key都要执行update
      sourceKeys
        .forEach(sourceKey => {
          const item = orderMap[sourceKey]
          if (item) {
            item.childKeys
              .forEach(
                childKey => {
                  changedKeyMap[childKey] = true
                }
              )
          }
        })

      changedKeys = Object.keys(changedKeyMap)
        .sort((key1, key2) => {
          const order1 = getPropertyOrder(key1, orderMap)
          const order2 = getPropertyOrder(key2, orderMap)
          return order1 - order2
        })
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