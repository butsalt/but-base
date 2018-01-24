import ButBase from 'but-base'

describe('listenable', () => {
  let component
  beforeEach(() => {
    component = new ButBase()
  })

  it('on', () => {
    const num = 1

    component.on('test', function (val) {
      expect(val)
        .toBe(num)
      expect(this)
        .toBe(component)
    })

    component.fire('test', [num])
  })

  it('proxy', () => {
    const obj = {}
    component.on('test', function () {
      expect(this)
        .toBe(obj)
    }, obj)
    component.fire('test')
  })

  it('order', () => {
    let order = 1
    component.on('test', function () {
      expect(order++)
        .toBe(1)
    })

    component.on('test', function () {
      expect(order)
        .toBe(2)
    })

    component.fire('test')
  })

  it('once', () => {
    const spy = jasmine.createSpy('fire')

    component.once('test', spy)

    component.fire('test')
    component.fire('test')

    expect(spy.calls.count())
      .toBe(1)
  })

  it('un', () => {
    const spy = jasmine.createSpy('fire')
    const anotherSpy = jasmine.createSpy('fire')

    component.on('test', spy)
    component.on('test', anotherSpy)

    component.fire('test')
    component.un('test')
    component.fire('test')

    expect(spy.calls.count())
      .toBe(1)
    expect(anotherSpy.calls.count())
      .toBe(1)
  })

  it('un spec', () => {
    const spy = jasmine.createSpy('fire')
    const alwaysSpy = jasmine.createSpy('fire')

    component.on('test', spy)
    component.on('test', alwaysSpy)

    component.fire('test')
    component.un('test', spy)
    component.fire('test')

    expect(spy.calls.count())
      .toBe(1)
    expect(alwaysSpy.calls.count())
      .toBe(2)
  })

  it('garbage collect', () => {
    const data = component.getFeatureData('listenable')

    function handler() {}
    component.on('test', handler)

    expect(data.handlersMap.test.length)
      .toBe(1)
    expect(data.scopesMap.test.length)
      .toBe(1)

    component.un('test', handler)
    expect(data.handlersMap.test)
      .toBeUndefined()
    expect(data.scopesMap.test)
      .toBeUndefined()
  })
})