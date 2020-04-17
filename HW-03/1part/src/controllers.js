const utils = require('./utilities')
const header = require('./headers')
const DB = require('./services/db')
const NotesService = require('./services/notes')

exports.getAllNotes = (req, res) => {
  DB.getAll((data) => {
    if (data.err) {
      console.error(data.err)
      utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
    } else {
      utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
    }
  })
}

exports.getById = (id, res) => {
  NotesService.getById(id, (data) => {
    if (data.err) {
      console.error(data.err)
      utils.sendResponse(res, 'Not found', 404, header.error404)
    } else {
      utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
    }
  })
}

exports.saveNote = (req, res) => {
  NotesService.save(req, (data) => {
    if (data.err) {
      console.error(data.err)
      utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
    } else {
      utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
    }
  })
}

exports.deleteNote = (id, res) => {
  NotesService.delete(id, (data) => {
    if (data.err) {
      console.error(data.err)
      utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
    } else {
      utils.sendResponse(res, JSON.stringify(data.status), 200, header.ok)
    }
  })
}

exports.updateNote = (req, res) => {
  NotesService.update(req, data => {
    if (data.err) {
      console.error(data.err)
      utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)  
    } else {
      utils.sendResponse(res, JSON.stringify(data), 200, header.ok)
    }
  })
}