const utils = require('./utilities')
const header = require('./headers')
const db = require('./services/database')
const TasksService = require('./services/tasks')

exports.getAllTasks = async (req, res) => {
  const tasks = JSON.stringify(await db.getAll())

  utils.sendResponse(res, tasks, 200, header.ok)
}

exports.getById = async (id, res) => {
  const task = await TasksService.getById(id)

  if (!task) {
    utils.sendResponse(res, 'Not found', 404, header.error404)
  } else {
    utils.sendResponse(res, task, 200, header.ok)
  }
}

exports.saveTask = async (req, res) => {
  const tasks = await TasksService.save(req)
  utils.sendResponse(res, tasks, 200, header.ok)
}

exports.deleteTask = async (id, res) => {
  const tasks = await TasksService.delete(id)

  utils.sendResponse(res, tasks, 200, header.ok)
}