import ButBase from 'but-base'

export default class OrderComponent extends ButBase {
  getUpdateConfigOrder() {
    return {
      first: {
        second: {
          third: true
        }
      },
      a: {
        b: {
          c: true
        },
        d: {
          e: true
        }
      }
    }
  }
}