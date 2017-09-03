import ButBase from 'but-base'

export default class OrderComponent extends ButBase {
  getUpdateConfigOrder() {
    return {
      c: ['d', 'f'],
      f: ['g'],
      a: ['b', 'c', 'f']
    }
  }
}