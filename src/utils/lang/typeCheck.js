/**
 * @Author:      孙雨珩
 * @DateTime:    2017-07-31 16:09:06
 * @Description: 类型检查
 * @Last Modified By:   孙雨珩
 * @Last Modified Time:    2017-08-09 09:32:53
 */

/**
 *  检查值是否和要求的类型匹配
 *  @param    {*}  val        等待检查的值
 *  @param    {string}  expectType 期望类型
 *  @return   {boolean} 为true说明类型检查通过，为false说明类型检查不通过
 */
export function is(val, expectType) {
  return Object.prototype.toString.call(val) === `[object ${expectType}]`
}

/**
 *  检查是否是Object类型
 *  @param    {*}  val 等待检查的类型
 *  @return   {boolean} 为true说明值是Object类型，为false说明值不是Object类型
 */
export function isObject(val) {
  return is(val, 'Object')
}

/**
 *  检查是否是String类型
 *  @param    {*}  val 等待检查的类型
 *  @return   {boolean} 为true说明值是String类型，为false说明值不是String类型
 */
export function isString(val) {
  return is(val, 'String')
}

/**
 *  检查是否是Function类型
 *  @param    {*}  val 等待检查的类型
 *  @return   {boolean} 为true说明值是Function类型，为false说明值不是Function类型
 */
export function isFunction(val) {
  return is(val, 'Function')
}

/**
 *  检查是否是Number类型
 *  @param    {*}  val 等待检查的类型
 *  @return   {boolean} 为true说明值是Number类型，为false说明值不是Number类型
 */
export function isNumber(val) {
  return is(val, 'Number')
}