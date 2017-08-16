import ButBase from 'but-base'

describe('configurable', () => {
  let component
  beforeEach(() => {
    component = new ButBase()
  })

  it('update', () => {
    const spy = jasmine.createSpy('updateData')

    component.updateData = spy
    const data = []
    component.config({
      data
    })

    expect(spy.calls.count()).toBe(1)
    expect(component.config().data).toBe(data)
  })

  it('merge', () => {
    component.config({
      data: {},
      normal: {
        first: 1
      },
      arr: []
    })

    const { normal } = component.config()
    const data = {}
    const arr = []
    component.config({
      data,
      normal: {
        second: 2
      },
      arr
    })

    const config = component.config()

    expect(config.data).toBe(data)

    expect(config.normal).toBe(normal)
    expect(config.normal.first).toBe(1)
    expect(config.normal.second).toBe(2)

    expect(config.arr).toBe(arr)
  })

  it('order', () => {
    component.getUpdateConfigOrder = function () {
      return {
        first: 1,
        second: 2,
        third: 3
      }
    }

    let order = 1

    component.updateFirst = function () {
      expect(order).toBe(1)
      order++
    }

    component.updateSecond = function () {
      expect(order).toBe(2)
      order++
    }

    component.updateThird = function () {
      expect(order).toBe(3)
      order++
    }

    component.config({
      third: true,
      first: true,
      second: true
    })
  })

  it('needExec', () => {
    component.getUpdateConfigOrder = function () {
      return {
        first: 1,
        second: 2,
      }
    }

    let order = 1

    component.updateFirst = function (taskWatier) {
      taskWatier.needExec('final')
    }

    component.updateSecond = function () {
      taskWatier.needExec('final')
    }

    const spy = jasmine.createSpy('final')

    component.final = spy

    component.config({
      third: true,
      first: true,
    })

    expect(spy.calls.count()).toBe(1)
  })

  it('needExec during first loop', () => {
    component.getUpdateConfigOrder = function () {
      return {
        first: 1,
        second: 2,
        third: 3
      }
    }

    let order = 1

    component.updateFirst = function (taskWatier) {
      taskWatier.needExec('updateThird')
    }

    component.updateSecond = function () {
      taskWatier.needExec('updateThird')
    }

    const spy = jasmine.createSpy('updateThird')

    component.updateThird = spy

    component.config({
      third: true,
      first: true,
      third: true
    })

    expect(spy.calls.count()).toBe(1)
  })

  it('prevent needExec from excuting same method twice', () => {
    try {
      component.updateData = function (taskWatier) {
        taskWatier.needExec('final')
      }

      component.final = function (taskWatier) {
        taskWatier.needExec('updateData')
      }

      component.config({
        data: {}
      })

      fail('needExec excutes same method should throw an error')
    } catch (e) {
      expect(e.message).toBe('重复执行了组件上的方法updateData')
    }
  })

  it('prevent needExec from excuting undefined method', () => {
    try {
      component.updateData = function (taskWatier) {
        taskWatier.needExec('final')
      }

      component.config({
        data: {}
      })

      fail('needExec excutes undefined method should throw an error')
    } catch (e) {
      expect(e.message).toBe('组件上不存在方法final')
    }
  })
})