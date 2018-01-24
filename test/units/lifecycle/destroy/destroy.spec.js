import ButBase from 'but-base'

describe('destroy', () => {
  it('destroy', () => {
    const component = new ButBase()

    expect(component.featuresData)
      .toBeDefined()

    const featuresData = component.featuresData

    expect(featuresData.configurable)
      .toBeDefined()

    expect(featuresData.templatable)
      .toBeDefined()

    expect(featuresData.listenable)
      .toBeDefined()

    expect(featuresData.storable)
      .toBeDefined()

    component.destroy()

    expect(component.featuresData)
      .toBeUndefined()

    expect(component.configurable)
      .toBeUndefined()

    expect(featuresData.templatable)
      .toBeUndefined()

    expect(featuresData.listenable)
      .toBeUndefined()

    expect(featuresData.storable)
      .toBeUndefined()

  })

  it('hook', () => {
    const component = new ButBase()

    const beforeDestroySpy = component.beforeDestroy = jasmine.createSpy('beforeDestroy')
    const destroyedSpy = component.destroyed = jasmine.createSpy('destroyed')

    component.destroy()

    expect(beforeDestroySpy.calls.count())
      .toBe(1)

    expect(destroyedSpy.calls.count())
      .toBe(1)

    expect(destroyedSpy.calls.first().invocationOrder)
      .toBeGreaterThan(beforeDestroySpy.calls.first().invocationOrder)
  })
})