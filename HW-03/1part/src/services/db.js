const Notes = require('../models/notes')

class DataBase {
  static saveNote(data, cb) {
    let note = { title: data.title, text: data.text }

    Notes.create(note, (err, note) => {
      if (err) return cb({ err: err })

      return cb(note)
    })
  }

  static getAll(cb) {
    Notes.find({}, (err, notes) => {
      if (err) return cb({ err: err })

      return cb(notes)
    })
  }

  static getById(id, cb) {
    Notes.findById(id, (err, note) => {
      if (err) return cb({ err: err })

      return cb(note)
    })
  }

  static delete(id, cb) {
    Notes.findByIdAndRemove(id, (err) => {
      if (err) return cb({ err: err })

      return cb({ status: true })
    })
  }

  static update(id, data, cb) {
    Notes.updateOne({ _id: id }, { $set: data }, (err) => {
      if (err) cb({ err: err })

      Notes.findById(id, (err, note) => {
        if (err) return cb({ err: err })
  
        return cb(note)
      })
    })
  }
}

module.exports = DataBase
