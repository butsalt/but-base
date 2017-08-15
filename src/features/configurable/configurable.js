/**
 * @Author:      孙雨珩
 * @DateTime:    2017-07-31 14:24:36
 * @Description: 使得组件实例能设置config，当config属性变化时自动调用相应update方法
 * @Last Modified By:   孙雨珩
 * @Last Modified Time:    2017-08-11 13:52:53
 */

import TaskWaiter from './TaskWaiter'
import merge from '@/utils/lang/merge'
import upperCaseFirstLetter from '@/utils/str/upperCaseFirstLetter'

const DATA_NAMESPACE = 'configurable'

/**
 *  在组件实例上挂载用来支持配置化的数据
 *  @param    {BaseComponent}  instance 组件实例
 */
export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)
  data.taskWaiter = new TaskWaiter(instance)
  // 第一次设置配置时需要合并默认配置
  data.isFirstSet = true
  // 默认的空配置
  data.config = {}
}

/**
 *  卸载组件实例上用来支持配置化的数据
 *  @param    {BaseComponent}  instance 组件实例
 */
export function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE)
}

/**
 *  从order表中获取property的order
 *  @param    {string}  property 属性名
 *  @param    {Object}  order    属性更新先后顺序的表
 *  @return   {number}  权重，权重越高越靠后
 */
function getPropertyOrder(property, order) {
  let val = order[property]
  if (val == null) {
    val = -Infinity
  }
  return val
}

/**
 *  需要挂载到原型链上的属性
 *  @type {Object}
 */
export const proto = {
  /**
   *  获取/更新config，更新时会根据更新了哪些属性来判断需要执行哪些更新方法
   *  @param    {Object=}  config 准备更新的config，如果为空则认为是获取config
   *  @return   {Object}  如果是设置config，返回组件实例本身，否则返回config
   */
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
  /**
   *  获取当调用config方法更新配置时，属性更新的先后顺序
   *  @return   {Object}  属性更新先后顺序的表，属性名:权重，权重的值越大越晚调用
   */
  getUpdateConfigOrder() {
    return null
  },
  /**
   *  组件实例初始化时的默认配置
   *  @return   {Object}  默认配置
   */
  getDefaultConfig() {
    return {

    }
  }
}