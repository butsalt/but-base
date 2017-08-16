const TASK_STATUS = {
  waiting: 1,
  executed: 2
}

export default class TaskWaiter {
  constructor(scope) {
    const me = this
    me.scope = scope
    me.reset()
  }
  reset() {
    const me = this
    me.taskMap = Object.create(null)
    me.tasks = []
  }
  needExec(apiName) {
    const me = this
    const taskMap = me.taskMap
    const taskStatus = taskMap[apiName]
    if (taskStatus == null) {
      const scope = me.scope
      if (!scope[apiName]) {
        throw new Error(`组件上不存在方法${apiName}`)
      }
      taskMap[apiName] = TASK_STATUS.waiting
      me.tasks.push(apiName)
    } else {
      if (taskStatus === TASK_STATUS.executed) {
        throw new Error(`重复执行了组件上的方法${apiName}`)
      }
    }
  }
  execTasks() {
    const me = this

    const scope = me.scope

    let tasks = me.tasks
    const taskMap = me.taskMap

    do {
      me.tasks = []
      tasks
        .forEach(function execTask(apiName) {
          scope[apiName](me)
          taskMap[apiName] = TASK_STATUS.executed
        })

      tasks = me.tasks
    } while(tasks.length)
  }
}