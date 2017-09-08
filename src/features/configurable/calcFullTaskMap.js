export default function calcFullTaskMap(taskMap, descendantMap) {
  const fullTaskMap = Object.create(null)
  for (let key in taskMap) {
    // taskMap中包含的key肯定要执行
    fullTaskMap[key] = true
    // key之后的后置任务都要执行
    const descendants = descendantMap[key]
    if (descendants) {
      for (let i = 0, ii = descendants.length; i < ii; i++) {
        fullTaskMap[descendants[i]] = true
      }
    }
  }
  return fullTaskMap
}