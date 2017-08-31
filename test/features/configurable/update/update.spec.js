import ButBase from 'but-base'
import OrderComponent from './OrderComponent'

describe('configurable update', () => {
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

    expect(spy.calls.count())
      .toBe(1)
    expect(component.config().data)
      .toBe(data)
  })

  it('order', () => {
    component = new OrderComponent()

    let order = 1

    component.updateFirst = function () {
      expect(order++)
        .toBe(1)
    }

    component.updateSecond = function () {
      expect(order++)
        .toBe(2)
    }

    component.updateThird = function () {
      expect(order)
        .toBe(3)
    }

    let seq = 1
    component.updateA = function () {
      expect(seq++)
        .toBe(1)
    }

    component.updateB = function () {
      expect(seq++)
        .toBe(2)
    }

    component.updateC = function () {
      expect(seq)
        .toBe(3)
    }

    component.config({
      third: true,
      first: true,
      second: true,
      a: true,
      b: true,
      c: true
    })
  })

  it('flow update', () => {
    component = new OrderComponent()

    let order = 1

    component.updateFirst = function () {
      expect(order++)
        .toBe(1)
    }

    component.updateSecond = function () {
      expect(order++)
        .toBe(2)
    }

    component.updateThird = function () {
      expect(order)
        .toBe(3)
    }

    let seq = 1
    component.updateA = function () {
      expect(seq++)
        .toBe(1)
    }

    component.updateB = function () {
      expect(seq++)
        .toBe(2)
    }

    component.updateC = function () {
      expect(seq)
        .toBe(3)
    }

    component.config({
      first: true,
      a: true
    })
  })

  it('flow partly', () => {
    component = new OrderComponent()

    const updateBSpy = component.updateB = jasmine.createSpy('updateB')
    const updateCSpy = component.updateC = jasmine.createSpy('updateC')
    const updateDSpy = component.updateD = jasmine.createSpy('updateD')
    const updateESpy= component.updateE = jasmine.createSpy('updateE')

    component.config({
      c: true,
      d: true
    })

    expect(updateBSpy.calls.count())
      .toBe(0)
    expect(updateCSpy.calls.count())
      .toBe(1)
    expect(updateDSpy.calls.count())
      .toBe(1)
    expect(updateESpy.calls.count())
      .toBe(1)

    expect(updateDSpy.calls.first().invocationOrder)
      .toBeLessThan(updateESpy.calls.first().invocationOrder)
  })

  it('needExec', () => {
    component = new OrderComponent()

    let order = 1

    component.updateFirst = function (taskWatier) {
      taskWatier.needExec('final')
    }

    component.updateSecond = function (taskWatier) {
      taskWatier.needExec('final')
    }

    const spy = jasmine.createSpy('final')

    component.final = spy

    component.config({
      second: true,
      first: true,
    })

    expect(spy.calls.count())
      .toBe(1)
  })

  it('needExec during first loop', () => {
    component = new OrderComponent()

    component.updateFirst = function (taskWatier) {
      taskWatier.needExec('updateThird')
    }

    component.updateSecond = function (taskWatier) {
      taskWatier.needExec('updateThird')
    }

    const spy = jasmine.createSpy('updateThird')

    component.updateThird = spy

    component.config({
      third: true,
      first: true,
      third: true
    })

    expect(spy.calls.count())
      .toBe(1)
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
      expect(e.message)
        .toBe('重复执行了组件上的方法updateData')
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
      expect(e.message)
        .toBe('组件上不存在方法final')
    }
  })
})