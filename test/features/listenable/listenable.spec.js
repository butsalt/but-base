import ButBase from 'but-base'

describe('listenable', () => {
  let base
  let spy
  beforeEach(() => {
    base = new ButBase()
    spy = jasmine.createSpy('fire')
  })

  it('on', () => {
    const num = 1

    base.on('test', function (val) {
      expect(val).toBe(num)
      expect(this).toBe(base)
    })

    base.fire('test', [num])
  })

  it('proxy', () => {
    const obj = {}
    base.on('test', function () {
      expect(this).toBe(obj)
    }, obj)
    base.fire('test')
  })

  it('order', () => {
    base.on('test', function (order) {
      expect(order.num).toBe(1)
      order.num++
    })

    base.on('test', function (order) {
      expect(order.num).toBe(2)
    })

    base.fire('test', [{
      num: 1
    }])
  })

  it('once', () => {

    base.once('test', spy)

    base.fire('test')
    base.fire('test')

    expect(spy.calls.count()).toBe(1)
  })

  it('un', () => {
    const anotherSpy = jasmine.createSpy('fire')
    base.on('test', spy)
    base.on('test', anotherSpy)

    base.fire('test')
    base.un('test')
    base.fire('test')

    expect(spy.calls.count()).toBe(1)
    expect(anotherSpy.calls.count()).toBe(1)
  })

  it('un spec', () => {
    const alwaysSpy = jasmine.createSpy('fire')

    base.on('test', spy)
    base.on('test', alwaysSpy)

    base.fire('test')
    base.un('test', spy)
    base.fire('test')

    expect(spy.calls.count()).toBe(1)
    expect(alwaysSpy.calls.count()).toBe(2)
  })

  it('garbage collect', () => {
    const data = base.getFeatureData('listenable')

    function handler() {}
    base.on('test', handler)

    expect(data.handlersMap.test.length).toBe(1)
    expect(data.scopesMap.test.length).toBe(1)

    base.un('test', handler)
    expect(data.handlersMap.test).toBeUndefined()
    expect(data.scopesMap.test).toBeUndefined()
  })
})