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
})