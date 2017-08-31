import ButBase from 'but-base'
import DefaultConfigComponent from './DefaultConfigComponent'
import InitConfigComponent from './InitConfigComponent'
import ConfigComponent from './ConfigComponent'

describe('configurable merge', () => {
  it('user config after user config', () => {
    const component = new ButBase()
    component.config({
      data: {},
      extraData: {},
      normal: {
        first: 1
      },
      arr: []
    })

    const { normal } = component.config()

    const data = {}
    const extraData = {}
    const arr = []
    component.config({
      data,
      extraData,
      normal: {
        second: 2
      },
      arr
    })

    const config = component.config()

    expect(config.data)
      .toBe(data)

    expect(config.extraData)
      .toBe(extraData)

    expect(config.normal)
      .toBe(normal)
    expect(config.normal.first)
      .toBe(1)
    expect(config.normal.second)
      .toBe(2)

    expect(config.arr)
      .toBe(arr)
  })

  it('default config', () => {
    const component = new DefaultConfigComponent()
    expect(component.config())
      .toEqual({
        data: {},
        extraData: {},
        normal: {
          first: 1
        },
        arr: []
      })
  })

  it('user config after default config', () => {
    const userConfig = {
      data: {},
      extraData: {},
      normal: {
        second: 2
      },
      arr: []
    }
    const component = new DefaultConfigComponent(userConfig)

    const config = component.config()

    expect(config.data)
      .toBe(userConfig.data)

    expect(config.extraData)
      .toBe(userConfig.extraData)

    expect(config.normal.first)
      .toBe(1)
    expect(config.normal.second)
      .toBe(2)

    expect(config.arr)
      .toBe(userConfig.arr)
  })

  it('init config', () => {
    const component = new InitConfigComponent()
    expect(component.config())
      .toEqual({
        data: {},
        extraData: {},
        normal: {
          first: 1
        },
        arr: []
      })
  })

  it('user config after init config', () => {
    const userConfig = {
      data: {},
      extraData: {},
      normal: {
        second: 2
      },
      arr: []
    }
    const component = new InitConfigComponent(userConfig)

    const config = component.config()

    expect(config.data)
      .toBe(userConfig.data)

    expect(config.extraData)
      .toBe(userConfig.extraData)

    expect(config.normal.first)
      .toBe(1)
    expect(config.normal.second)
      .toBe(2)

    expect(config.arr)
      .toBe(userConfig.arr)
  })

  it('user config after init config after default config', () => {
    const userConfig = {
      data: {},
      extraData: {},
      normal: {
        third: 3
      },
      arr: []
    }
    const component = new ConfigComponent(userConfig)

    const config = component.config()

    expect(config.data)
      .toBe(userConfig.data)

    expect(config.extraData)
      .toBe(userConfig.extraData)

    expect(config.normal.first)
      .toBe(1)
    expect(config.normal.second)
      .toBe(2)
    expect(config.normal.third)
      .toBe(3)

    expect(config.arr)
      .toBe(userConfig.arr)
  })
})