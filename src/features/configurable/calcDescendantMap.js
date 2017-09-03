export default function calcDescendantMap(depMap) {
  const map = Object.create(null)
  for (let key in depMap) {
    let deps = depMap[key]
    for (let i = 0, ii = deps.length; i < ii; i++) {
      const depKey = deps[i]
      let curMap = map[depKey]
      if (!curMap) {
        curMap = map[depKey] = Object.create(null)
      }
      curMap[key] = true
    }
  }
  const descendantMap = Object.create(null)
  for (let key in map) {
    descendantMap[key] = Object.keys(
      map[key]
    )
  }
  return descendantMap
}