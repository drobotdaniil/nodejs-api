const utils = require('./helpers/utilities')
const header = require('./helpers/headers')
const { parse } = require('url')
const DatabaseService = require('./services/database')
const NotesService = require('./services/notes')
const { getBody } = require('./helpers/getBody')

exports.getAllNotes = async (res) => {
  try {
    const data = await DatabaseService.getAll()
    utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
  } catch (err) {
    console.error(err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}

exports.getById = async (req, res) => {
  try {
    const { id } = parse(req.url, true).query
    const data = await NotesService.getById(id)

    utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
  } catch (err) {
    console.error(data.err)
    utils.sendResponse(res, 'Not found', 404, header.error404)
  }
}

exports.saveNote = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await NotesService.save(body)

    res.end(JSON.stringify(data))
  } catch (err) {
    console.error(data.err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}

exports.deleteNote = async (req, res) => {
  try {
    const { id } = parse(req.url, true).query
    await NotesService.delete(id)

    utils.sendResponse(res, 'DELETED', 200, header.ok)
  } catch (err) {
    console.log(err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}

exports.updateNote = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await NotesService.update(body)
    
    utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
  } catch (err) {
    console.error(err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}
