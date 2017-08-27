import ButBase from 'but-base'

export default class DomComponent extends ButBase {
  getDefaultConfig() {
    return {
      data: {},
      normal: {
        first: 1
      },
      arr: []
    }
  }
}