import ButBase from 'but-base'

export default class InitConfigComponent extends ButBase {
  inited() {
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