const { sendResponse } = require('../utilities')
const { ok, error404, error500 } = require('../headers')
const ManagerService = require('../services/manager')

exports.getAllManagers = async (res) => {
  try {
    const data = await ManagerService.getAll()
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.getById = async (id, res) => {
  try {
    const data = await ManagerService.getById(id)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Not found', 404, error404)
  }
}

exports.saveManager = async (req, res) => {
  try {
    const data = await ManagerService.save(req)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.deleteManager = async (id, res) => {
  try {
    await ManagerService.delete(id)
    sendResponse(res, 'DELETED', 200, ok)
  } catch (err) {
    console.log(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.updateManager = async (req, res) => {
  try {
    const data = await ManagerService.update(req)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}
