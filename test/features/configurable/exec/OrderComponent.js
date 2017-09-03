import ButBase from 'but-base'

export default class OrderComponent extends ButBase {
  getUpdateConfigOrder() {
    return {
      third: ['first', 'second']
    }
  }
}