export default function nvl(originVal, defaultVal) {
  if (originVal == null) {
    originVal = defaultVal
  }
  return originVal
}