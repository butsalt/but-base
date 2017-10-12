import ButBase from 'but-base'

describe('destroy', () => {
  it('hook', () => {
    const beforeInitSpy = jasmine.createSpy('beforeInit')
    const initedSpy = jasmine.createSpy('inited')

    const Component = ButBase.compile({
      beforeInit: beforeInitSpy,
      inited: initedSpy
    })
    const component = new Component()

    expect(beforeInitSpy.calls.count())
      .toBe(1)

    expect(initedSpy.calls.count())
      .toBe(1)

    expect(initedSpy.calls.first().invocationOrder)
      .toBeGreaterThan(beforeInitSpy.calls.first().invocationOrder)
  })
})