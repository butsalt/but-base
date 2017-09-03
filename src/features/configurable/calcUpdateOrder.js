export default function calcUpdateOrder(config, depMap) {
  const tasks = []
  const taskMap = Object.create(null)
  const descendantMap = Object.create(null)
  for (let key in config) {
    const task = {
      key,
      // 前置任务数量
      count: 0
    }
    tasks.push(task)
    taskMap[key] = task
    const deps = depMap[key]
    if (deps) {
      // 存在前置任务
      for (let i = 0, ii = deps.length; i < ii; i++) {
        const depKey = deps[i]
        if (depKey in config) {
          // 前置任务的key存在于config中，执行task前要先执行前置任务
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

  // 执行顺序队列
  const queue  = []
  while (true) {
    for (let i = 0, ii = tasks.length; i < ii; i++) {
      const task = tasks[i]
      if (task.count === 0) {
        // 当前任务的前置任务全部处理完毕，可以执行当前任务了
        const key = task.key
        queue.push(key)
        // 从任务列表中移除
        tasks.splice(i, 1)
        i--
        // 任务列表长度减1
        ii--
        // 所有依赖当前任务的任务的前置任务count都减1
        const descendants = descendantMap[key]
        if (descendants) {
          for (let j = 0, jj = descendants.length; j < jj; j++) {
            taskMap[descendants[j]].count--
          }
        }
      }
    }
    if (tasks.length === 0) {
      // 所有任务执行完毕
      break
    }
  }
  return queue
}