const DocumentService = require('../services/document')
const { sendResponse } = require('../utilities')
const { ok, error404, error500 } = require('../headers')

exports.getAll = async (res) => {
  try {
    const data = await DocumentService.getAll()
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.getById = async (id, res) => {
  try {
    const data = await DocumentService.getById(id)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Not found', 404, error404)
  }
}

exports.saveDoc = async (req, res) => {
  try {
    const data = await DocumentService.save(req)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.deleteDoc = async (id, res) => {
  try {
    await DocumentService.delete(id)
    sendResponse(res, 'DELETED', 200, ok)
  } catch (err) {
    console.log(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.updateDoc = async (req, res) => {
  try {
    const data = await DocumentService.update(req)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.setDoc = async (id, managerId, res) => {
  try {
    const data = await DocumentService.set(id, managerId)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}
