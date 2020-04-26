const DocumentService = require('../services/document')
const { sendResponse } = require('../helpers/utilities')
const { ok, error404, error500 } = require('../helpers/headers')
const { parse } = require('url')
const { getBody } = require('../helpers/getBody')

exports.getAll = async (res) => {
  try {
    const data = await DocumentService.getAll()
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.getById = async (req, res) => {
  try {
    const { id } = parse(req.url, true).query
    const data = await DocumentService.getById(id)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Not found', 404, error404)
  }
}

exports.saveDoc = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await DocumentService.save(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.deleteDoc = async (req, res) => {
  try {
    const { id } = parse(req.url, true).query
    await DocumentService.delete(id)

    sendResponse(res, 'DELETED', 200, ok)
  } catch (err) {
    console.log(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.updateDoc = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await DocumentService.update(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.setDoc = async (req, res) => {
  try {
    const { id, managerId } = parse(req.url, true).query
    const data = await DocumentService.set(id, managerId)
    
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}
