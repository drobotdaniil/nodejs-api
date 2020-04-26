const DB = require('./database')

class NotesService {
  static getById(id) {
    return DB.getById(id)
  }

  static delete(id) {
    return DB.delete(id)
  }

  static async save(body) {
    return DB.saveNote(body)
  }

  static async update({id, title, text}) {
    return DB.update(id, {title, text})
  }
}

module.exports = NotesService
