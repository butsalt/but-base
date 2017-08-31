import ButBase from 'but-base'

export default class ConfigComponent extends ButBase {
  inited() {
    return {
      data: {},
      extraData: {},
      normal: {
        second: 2
      },
      arr: []
    }
  }
  getDefaultConfig() {
    return {
      data: {},
      extraData: {},
      normal: {
        first: 1
      },
      arr: []
    }
  }
}