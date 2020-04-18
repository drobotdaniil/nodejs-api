const utils = require('./utilities')
const header = require('./headers')
const DB = require('./models/notes')
const NotesService = require('./services/notes')

exports.getAllNotes = async (res) => {
  try {
    const data = await DB.getAll()
    utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
  } catch (err) {
    console.error(err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}

exports.getById = async (id, res) => {
  try {
    const data = await NotesService.getById(id)
    utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
  } catch (err) {
    console.error(data.err)
    utils.sendResponse(res, 'Not found', 404, header.error404)
  }
}

exports.saveNote = async (req, res) => {
  try {
    const data = await NotesService.save(req)
    res.end(JSON.stringify(data))
  } catch (err) {
    console.error(data.err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}

exports.deleteNote = async (id, res) => {
  try {
    await NotesService.delete(id)
    utils.sendResponse(res, 'DELETED', 200, header.ok)
  } catch (err) {
    console.log(err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}

exports.updateNote = async (req, res) => {
  try {
    const data = await NotesService.update(req)
    utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
  } catch (err) {
    console.error(err)
    utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
  }
}
