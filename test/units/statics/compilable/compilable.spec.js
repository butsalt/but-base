import ButBase from 'but-base'

describe('compilable', () => {
  it('name', () => {
    const desc = {
      name: 'Test'
    }

    const cls = ButBase.compile(desc)
    expect(cls.name)
      .toBe('Test')

    // 不允许desc中的name属性被复制到原型链中
    expect(cls.prototype.name)
      .toBeUndefined()

    expect(
      ButBase.compile(desc).name
    )
      .toBe('Test')
  })

  it('inherit prototype of ButBase', () => {
    const cls = ButBase.compile({})
    expect(
      Object.getPrototypeOf(cls.prototype)
    )
      .toBe(ButBase.prototype)
  })

  it('use property in desc as prototype', () => {
    const desc = {
      test() {}
    }
    const cls = ButBase.compile(desc)

    expect(cls.prototype.test)
      .toBe(desc.test)
  })
})