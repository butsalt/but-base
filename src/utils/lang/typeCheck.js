export function is(val, expectType) {
  return Object.prototype.toString.call(val) === `[object ${expectType}]`
}

export function isObject(val) {
  return is(val, 'Object')
}

export function isString(val) {
  return is(val, 'String')
}

export function isFunction(val) {
  return is(val, 'Function')
}

export function isNumber(val) {
  return is(val, 'Number')
}