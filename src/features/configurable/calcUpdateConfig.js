export default function calcUpdateConfig(config, descendantMap) {
  const updateConfig = Object.create(null)
  for (let key in config) {
    updateConfig[key] = true
    const descendants = descendantMap[key]
    if (descendants) {
      for (let i = 0, ii = descendants.length; i < ii; i++) {
        updateConfig[descendants[i]] = true
      }
    }
  }
  return updateConfig
}