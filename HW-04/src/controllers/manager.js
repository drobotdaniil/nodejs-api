const { sendResponse } = require('../helpers/utilities')
const { ok, error404, error500 } = require('../helpers/headers')
const ManagerService = require('../services/manager')
const { parse } = require('url')
const { getBody } = require('../helpers/getBody')

exports.getAllManagers = async (res) => {
  try {
    const data = await ManagerService.getAll()
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.getById = async (req, res) => {
  try {
    const { id } = parse(req.url, true).query
    const data = await ManagerService.getById(id)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Not found', 404, error404)
  }
}

exports.saveManager = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await ManagerService.save(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.deleteManager = async (req, res) => {
  try {
    const { id } = parse(req.url, true).query
    await ManagerService.delete(id)
    
    sendResponse(res, 'DELETED', 200, ok)
  } catch (err) {
    console.log(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.updateManager = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await ManagerService.update(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}
