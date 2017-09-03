export default function calcUpdateOrder(config, depMap) {
  const tasks = []
  const taskMap = Object.create(null)
  const descendantMap = Object.create(null)
  for (let key in config) {
    const task = {
      key,
      count: 0
    }
    tasks.push(task)
    taskMap[key] = task
    const deps = depMap[key]
    if (deps) {
      for (let i = 0, ii = deps.length; i < ii; i++) {
        const depKey = deps[i]
        if (depKey in config) {
          task.count++
          
          let descendants = descendantMap[depKey]
          if (!descendants) {
            descendants = descendantMap[depKey] = []
          }
          descendants.push(key)
        }
      }
    }
  }

  const queue  = []
  while (true) {
    for (let i = 0, ii = tasks.length; i < ii; i++) {
      const task = tasks[i]
      if (task.count === 0) {
        const key = task.key
        queue.push(key)
        tasks.splice(i, 1)
        i--
        ii--
        const descendants = descendantMap[key]
        if (descendants) {
          for (let j = 0, jj = descendants.length; j < jj; j++) {
            taskMap[descendants[j]].count--
          }
        }
      }
    }
    if (tasks.length === 0) {
      break
    }
  }
  return queue
}