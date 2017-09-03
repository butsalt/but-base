export default function calcUpdateConfig(config, descendantMap) {
  const updateConfig = Object.create(null)
  for (let key in config) {
    // config中包含的key肯定要执行
    updateConfig[key] = true
    // key之后的后置任务都要执行
    const descendants = descendantMap[key]
    if (descendants) {
      for (let i = 0, ii = descendants.length; i < ii; i++) {
        updateConfig[descendants[i]] = true
      }
    }
  }
  return updateConfig
}