import ButBase from 'but-base'

describe('storable', () => {
  let component
  beforeEach(() => {
    component = new ButBase()
  })

  it('data', () => {
    const obj = {}

    component.data('test', obj)

    expect(component.data('test')).toBe(obj)
  })

  it('removeData', () => {
    const obj = {}

    component.data('test', obj)

    const removedData = component.removeData('test')
    expect(removedData).toBe(obj)
    expect(component.data('test')).toBeUndefined()
  })
})