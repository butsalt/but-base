/**
 * @Author:      孙雨珩
 * @DateTime:    2017-08-01 11:41:32
 * @Description: 首字母大写
 * @Last Modified By:   孙雨珩
 * @Last Modified Time:    2017-08-01 11:41:32
 */

/**
 *  首字母大写
 *  @param    {string}  str 需要首字母大写的字符串
 *  @return   {string}  首字母转成大写的字符串
 */
export default function upperCaseFirstLetter(str) {
  return str[0].toUpperCase() + str.slice(1)
}