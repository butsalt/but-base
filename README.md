# 不过是一个基类

## 使用方式

```
import ButBase from 'but-base'

class SpecComponent extends ButBase {
  
}

const component = new SpecComponent()

```

## 功能

### 数据暂存

#### 添加数据
```javascript
component.data('key', 'sth')

component.data('key') === 'sth'
```

#### 移除数据
```
const removedData = component.removeData('key')

removedData === 'sth'

component.data('key') === undefined

```

### 事件

#### 监听

```
component.on('key', function (arg1, arg2) {
  this === component
  arg1 === 'foo'
  arg2 === 'bar'
})

component.fire('key', ['foo', 'bar'])

```

### 改变监听函数的上下文

```
const person = {
  name: 'butSalt'
}

component.on('key', function (arg1, arg2) {
  this === person
}, person)

component.fire('key')
```

### 监听一次

```
component.once('key', function () {
  // 这个函数只会被调用一次
})

component.fire('key')
component.fire('key')
```

### 移除监听

```
// 移除指定namespace下的所有监听函数
component.un('key')

// 移除指定namespace下的指定监听函数
component.un('key', handler)
```

### 模板

#### 模板实例化

```
class Component extends ButBase {
  getTemplate() {
    return '<div></div>'
  }
}

const component = new Component()

// 获取根据模板自动实例化dom/svg元素，默认为null
component.getEl()
```

#### 挂载

```
new Component({
  // 根据selector查找容器，组件的dom会挂载到容器下
  el: '#target'
})

new Component({
  // 直接传dom对象也可以
  el: dom
})

// 也可通过此方法进行挂载
component.mountTo('#target')

```

#### 卸载

```
// 通过调用此方法卸载组件的dom
component.unmount()
```

### 配置

#### 一般使用方式

```
class Component extends ButBase {
  updateFoo() {
    const { foo } = this.config()
  }
  updateBar() {
    const { bar } = this.config()
  }
}

const component = new Component()

// 当配置更新时，对应的update方法会被调用
component.config({
  foo: 1,
  bar: 2
})
```

#### 控制更新方法的执行先后顺序

```
class Component extends ButBase {
  // 第一个被调用
  updateFirst() {

  }
  // 第二个被调用
  updateSecond() {

  }
  // 第三个被调用
  updateThird() {

  }
  getUpdateConfigOrder() {
    // 默认值是-Infinity
    // 值越大对应的key调用的越晚
    return {
      first: 1,
      second: 2,
      third: 3
    }
  }
}

const component = new Component()

component.config({
  third: true,
  second: true,
  first: true,
})
```

#### 更新方法内调用其他方法

```
class Component extends ButBase {
  updateFoo(taskWaiter) {
    taskWaiter.needExec('final')
  }
  updateBar() {
    taskWaiter.needExec('final')
  }
  // 该方法在updateFoo，updateBar执行后被调用，且只执行一次
  final(taskWaiter) {
    taskWaiter.needExec('extra')
  }
  // 该方法在final执行后被调用
  extra() {

  }
}

const component = new Component()

component.config({
  foo: true,
  bar: true
})
```

#### 组件默认配置

```
class Component extends ButBase {
  updateFoo() {

  }
  updateBar() {

  }
  getDefaultConfig() {
    return {
      foo: true
    }
  }
}

const component = new Component({
  bar: true
})

// 实例化组件时传递的配置会和默认配置进行合并，生成实例的初始化配置
// 本例中，组件实例化后，会自动使用以下配置调用对应的update方法
{
  foo: true,
  bar: true
}
```

#### 配置合并逻辑

```
component.config({
  arr: [1, 2, 3],
  obj: {
    foo: true
  },
  dataA: {
    foo: true
  },
  bData: {
    foo: true
  }
})

component.config({
  // 数组直接覆盖
  arr: [4, 5, 6],
  // 对象会进行合并
  obj: {
    bar: true
  },
  // 属性名中含有'data'的直接覆盖
  dataA: {
    bar: true
  },
  bData: {
    bar: true
  }
})

{
  arr: [4, 5, 6],
  obj: {
    foo: true,
    bar: true
  },
  dataA: {
    bar: true
  },
  dataB: {
    bar: true
  }
}
```

## 生命周期

```
class Component extends ButBase {
  // 触发于features尚未加载，配置尚未初始化之前
  beforeInit() {
    super.beforeInit()

    // do sth
  }
  // 触发于features加载完毕，配置初始化完毕之后
  // 触发于使用component.config方法更新组件的配置之前
  // 触发于使用component.mounTo挂载组件之前
  inited() {
    super.inited()

    // do sth
  }
  // 触发于features，配置尚未销毁之前
  beforeDestroy() {

    // do sth

    super.beforeDestroy()
  }
  destroyed() {
    // 触发于features，配置销毁之后

    // do sth

    super.destroyed()
  }
}
```