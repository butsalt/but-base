const DATA_NAMESPACE = 'listenable'

function getDataByKey(instance, key, creatable) {
  const data = instance.getFeatureData(DATA_NAMESPACE)

  const handlersMap = data.handlersMap
  let handlers = handlersMap[key]

  const scopesMap = data.scopesMap
  let scopes = scopesMap[key]

  if (!handlers && creatable) {
    handlers = handlersMap[key] = []
    scopes = scopesMap[key] = []
  }

  return {
    handlers, scopes
  }
}

export function init(instance) {
  const data = instance.createFeatureData(DATA_NAMESPACE)
  data.handlersMap = Object.create(null)
  data.scopesMap = Object.create(null)
}

export function destroy(instance) {
  instance.removeFeatureData(DATA_NAMESPACE)
}

export const proto = {
  un(key, handler) {
    const me = this

    const { handlers, scopes } = getDataByKey(me, key)
    if (handlers) {
      if (handler) {
        // 要求卸载指定的handler
        const index = handlers.indexOf(handler)
        if (index !== -1) {
          handlers.splice(index, 1)
          scopes.splice(index, 1)
        }
      } else {
        // 卸载指定key的所有handler
        handlers.length = 0
        scopes.length = 0
      }

      if (handlers.length === 0) {
        const data = me.getFeatureData(DATA_NAMESPACE)
        // 没有正在监听的handler了，删除key对应的数据空间
        delete data.handlersMap[key]
        delete data.scopesMap[key]
      }
    }

    return me
  },

  on(key, handler, scope) {
    const me = this
    if (!scope) {
      // 默认对象本身
      scope = me
    }

    const { handlers, scopes } = getDataByKey(me, key, true)

    handlers.push(handler)
    scopes.push(scope)

    return me
  },

  once(key, handler, scope) {
    const me = this

    me.on(
      key,
      function disposableHandler() {
        // 执行一次后就解绑
        me.un(key, disposableHandler)
        handler.apply(this, [...arguments])
      },
      scope
    )

    return me
  },

  fire(key, args) {
    const me = this

    const { handlers, scopes } = getDataByKey(me, key)

    if (handlers) {
      for (let i = 0; i < handlers.length; i++) {
        const handler = handlers[i]
        handler.apply(scopes[i], args)
        if (handler.name === 'disposableHandler') {
          // disposableHandler执行后就移除，游标需要向前移一位
          i--
        }
      }
    }
  }
}