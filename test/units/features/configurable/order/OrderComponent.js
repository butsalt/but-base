import ButBase from 'but-base'

export default class OrderComponent extends ButBase {
  getExecOrder() {
    return {
      updateC: ['updateD', 'updateF'],
      updateF: ['updateG'],
      updateA: ['updateB', 'updateC', 'updateF']
    }
  }
}