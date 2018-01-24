import ButBase from 'but-base'

export default class DefaultConfigComponent extends ButBase {
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