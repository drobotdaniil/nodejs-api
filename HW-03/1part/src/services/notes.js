const DB = require('../services/db')

class Notes {
  static getById(id, cb) {
    DB.getById(id, (data) => cb(data))
  }

  static delete(id, cb) {
    DB.delete(id, data => cb(data))
  }

  static async save(req, cb) {
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    DB.saveNote(JSON.parse(body), (data) => cb(data))
  }

  static async update(req, cb) {
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    let parsed = JSON.parse(body)

    DB.update(parsed.id, parsed.data, data => cb(data))
  }
}

module.exports = Notes
