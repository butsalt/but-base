function calcDeepDep(key, depMap, keyDeepDepMap) {
  const deps = depMap[key]
  if (!deps) {
    // 没有前置任务
    return keyDeepDepMap
  }
  for (let i = 0, ii = deps.length; i < ii; i++) {
    const depKey = deps[i]
    if (keyDeepDepMap[depKey]) {
      // depKey已经是key的前置任务了，避免重复递归
      continue
    }
    keyDeepDepMap[depKey] = true
    calcDeepDep(depKey, depMap, keyDeepDepMap)
  }
  return keyDeepDepMap
}

export default function calcDeepDepMap(depMap) {
  const map  = Object.create(null)
  for (let key in depMap) {
    // 计算key的所有前置任务
    map[key] = Object.keys(
      calcDeepDep(key, depMap, Object.create(null))
    )
  }
  return map
}