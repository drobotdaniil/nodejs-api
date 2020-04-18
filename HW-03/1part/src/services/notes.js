const DB = require('../models/notes')

class Notes {
  static getById(id) {
    return DB.getById(id)
  }

  static delete(id) {
    return DB.delete(id)
  }

  static async save(req) {
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    return DB.saveNote(JSON.parse(body))
  }

  static async update(req) {
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    let parsed = JSON.parse(body)

    return DB.update(parsed.id, parsed.data)
  }
}

module.exports = Notes
