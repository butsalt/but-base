function calcDeepDep(key, depMap) {
  let deepDepKeys = []
  const deps = depMap[key]
  if (!deps) {
    return deepDepKeys
  }
  for (let i = 0, ii = deps.length; i < ii; i++) {
    const depKey = deps[i]
    deepDepKeys.push(depKey)
    deepDepKeys = deepDepKeys.concat(
      calcDeepDep(depKey, depMap)
    )
  }
  return deepDepKeys
}

export default function calcDeepDepMap(depMap) {
  const map  = Object.create(null)
  for (let key in depMap) {
    map[key] = calcDeepDep(key, depMap)
  }
  return map
}