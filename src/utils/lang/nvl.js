/**
 * @Author:      孙雨珩
 * @DateTime:    2017-08-09 09:36:59
 * @Description: 当为null或者undefined时，使用默认值
 * @Last Modified By:   孙雨珩
 * @Last Modified Time:    2017-08-09 09:36:59
 */

/**
 *  当为null或者undefined时，使用默认值
 *  @param    {*}  originVal  原始值
 *  @param    {*}  defaultVal 默认值
 *  @return   {*}  val 处理后的值
 */
export default function nvl(originVal, defaultVal) {
  if (originVal == null) {
    originVal = defaultVal
  }
  return originVal
}