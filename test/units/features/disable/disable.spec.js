import ButBase from 'but-base'

describe('disable', () => {
  let component
  beforeEach(() => {
    component = new ButBase()
  })

  it('disable', () => {
    component.updateTest = function () {
      this.fire('change')
    }

    const spy = jasmine.createSpy('change')

    component.on('change', spy)

    component
      .config({
        test: true
      })
    expect(spy.calls.count())
      .toBe(1)

    component
      .config({
        test: true
      }, true)

    expect(spy.calls.count())
      .toBe(1)

    component
      .config({
        test: true
      })
    expect(spy.calls.count())
      .toBe(2)
  })

})