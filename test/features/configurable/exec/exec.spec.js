import ButBase from 'but-base'
import OrderComponent from './OrderComponent'

describe('configurable exec', () => {
  let component
  beforeEach(() => {
    component = new ButBase()
  })

  it('needExec', () => {
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
      first: true,
      second: true
    })

    expect(spy.calls.count())
      .toBe(1)
  })

  it('needExec during first loop', () => {
    const component = new OrderComponent()

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
      second: true,
      first: true
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