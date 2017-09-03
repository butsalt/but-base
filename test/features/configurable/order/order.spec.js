import OrderComponent from './OrderComponent'

function getOrder(spy) {
  return spy.calls.first().invocationOrder
}

describe('configurable order', () => {
  let component
  beforeEach(() => {
    component = new OrderComponent()
  })

  it('order', () => {
    const spyA = component.updateA = jasmine.createSpy('updateA')

    const spyB = component.updateB = jasmine.createSpy('updateB')

    const spyC = component.updateC = jasmine.createSpy('updateC')

    const spyD = component.updateD = jasmine.createSpy('updateD')

    const spyE = component.updateE = jasmine.createSpy('updateE')

    const spyF = component.updateF = jasmine.createSpy('updateF')

    const spyG = component.updateG = jasmine.createSpy('updateG')

    const spyH = component.updateH = jasmine.createSpy('updateH')

    component.config({
      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      f: true,
      g: true,
      h: true
    });

    [spyA, spyB, spyC, spyD, spyE, spyF, spyG, spyH]
      .forEach(spy => {
        expect(spy.calls.count())
          .toBe(1)
      })

    const orderA = getOrder(spyA)

    const orderB = getOrder(spyB)

    const orderC = getOrder(spyC)

    const orderD = getOrder(spyD)

    const orderE = getOrder(spyE)

    const orderF = getOrder(spyF)

    const orderG = getOrder(spyG)

    expect(orderC)
      .toBeGreaterThan(orderD)
    expect(orderC)
      .toBeGreaterThan(orderF)

    expect(orderF)
      .toBeGreaterThan(orderG)

    expect(orderA)
      .toBeGreaterThan(orderB)
    expect(orderA)
      .toBeGreaterThan(orderC)
    expect(orderA)
      .toBeGreaterThan(orderF)
  })

  it('flow partly', () => {
    const spyA = component.updateA = jasmine.createSpy('updateA')

    const spyB = component.updateB = jasmine.createSpy('updateB')

    const spyC = component.updateC = jasmine.createSpy('updateC')

    const spyD = component.updateD = jasmine.createSpy('updateD')

    const spyE = component.updateE = jasmine.createSpy('updateE')

    const spyF = component.updateF = jasmine.createSpy('updateF')

    const spyG = component.updateG = jasmine.createSpy('updateG')

    const spyH = component.updateH = jasmine.createSpy('updateH')

    component.config({
      f: true
    });

    [spyA, spyC, spyF]
      .forEach(spy => {
        expect(spy.calls.count())
          .toBe(1)
      });

    [spyB, spyD, spyE, spyG, spyH]
      .forEach(spy => {
        expect(spy.calls.count())
          .toBe(0)
      })

    const orderA = getOrder(spyA)

    const orderC = getOrder(spyC)

    const orderF = getOrder(spyF)

    expect(orderC)
      .toBeGreaterThan(orderF)

    expect(orderA)
      .toBeGreaterThan(orderC)

    expect(orderA)
      .toBeGreaterThan(orderF)
  })
})