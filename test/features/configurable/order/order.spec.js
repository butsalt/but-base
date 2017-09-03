import ButBase from 'but-base'
import OrderComponent from './OrderComponent'

function getOrder(spy) {
  return spy.calls.first().invocationOrder
}

describe('configurable order', () => {
  it('order', () => {
    const component = new OrderComponent()

    let order = 1

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
    })

    const orderA = getOrder(spyA)

    const orderB = getOrder(spyB)

    const orderC = getOrder(spyC)

    const orderD = getOrder(spyD)

    const orderE = getOrder(spyE)

    const orderF = getOrder(spyF)

    const orderG = getOrder(spyG);

    /*
      {
        c: ['d', 'f'],
        f: ['g'],
        a: ['b', 'c', 'f']
      }
    */
    [spyA, spyB, spyC, spyD, spyE, spyF, spyG, spyH]
      .forEach(spy => {
        expect(spy.calls.count())
          .toBe(1)
      })

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
})