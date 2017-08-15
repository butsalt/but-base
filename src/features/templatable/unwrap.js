import $ from 'jquery'
import d3 from 'd3'
import { isString } from '@/utils/lang/typeCheck'

export default function unwrap(el) {
  if (isString(el)) {
    // el是选择器，查找选择器对应的元素
    el = document.querySelector(el)
  }
  return el
}