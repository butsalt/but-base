# 不过是一个基类

## 使用方式

```javascript
import ButBase from 'but-base'

class Component extends ButBase {
  
}

const component = new Component()

```

## 功能

### 数据存储

#### 添加数据
```javascript
component.data('key', 'sth')

component.data('key') === 'sth'
```

#### 移除数据
```javascript
const removedData = component.removeData('key')

removedData === 'sth'

component.data('key') === undefined

```

### 事件

#### 监听

```javascript
component.on('key', function (arg1, arg2) {
  this === component
  arg1 === 'foo'
  arg2 === 'bar'
})

component.fire('key', ['foo', 'bar'])

```

#### 改变监听函数的上下文

```javascript
const person = {
  name: 'butSalt'
}

component.on('key', function (arg1, arg2) {
  this === person
}, person)

component.fire('key')
```

#### 监听一次

```javascript
component.once('key', function () {
  // 这个函数只会被调用一次
})

component.fire('key')
component.fire('key')
```

#### 移除监听

```javascript
// 移除指定namespace下的所有监听函数
component.un('key')

// 移除指定namespace下的指定监听函数
component.un('key', handler)
```

### 模板

#### 模板实例化

```javascript
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

```javascript
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

```javascript
// 通过调用此方法卸载组件的dom
component.unmount()
```

### 配置

#### 一般使用方式

```javascript
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

```javascript
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
  first: true
})
```

#### 更新方法内调用其他方法

```javascript
class Component extends ButBase {
  updateFoo(taskWaiter) {
    taskWaiter.needExec('final')
  }
  updateBar(taskWaiter) {
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

```javascript
class Component extends ButBase {
  updateFoo() {

  }
  updateBar() {

  }
  // 默认配置
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
// 接着，组件会使用这份配置首次调用对应的update方法
{
  foo: true,
  bar: true
}
```

#### 配置合并逻辑

```javascript
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
  // 属性名中含有'data'的直接覆盖
  bData: {
    bar: true
  }
})

// 合并后的配置
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

```javascript
class Component extends ButBase {
  // 触发于：
  //   features加载之前
  //   触发于配置初始化之前
  beforeInit() {
    // 父类的先调用
    super.beforeInit()

    // do sth
  }
  // 触发于：
  //   features加载之后
  //   配置初始化完毕之后
  //   使用component.config方法调用各个update方法之前
  //   使用component.mountTo挂载组件的dom之前
  inited() {
    // 父类的先调用
    super.inited()

    // do sth
  }
  // 触发于：
  //   features销毁之前
  //   配置销毁之前
  beforeDestroy() {
    // do sth

    // 父类的后调用
    super.beforeDestroy()
  }
  // 触发于：
  //   features销毁完之后
  //   配置销毁完成之后
  destroyed() {
    // do sth

    // 父类的后调用
    super.destroyed()
  }
}
```