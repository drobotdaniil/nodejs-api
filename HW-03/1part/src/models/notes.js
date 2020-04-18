const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
  },
  text: {
    type: String,
  },
})

const Notes = mongoose.model('Notes', schema)

class DataBase {
  static async saveNote(data) {
    let note = { title: data.title, text: data.text }

    return await Notes.create(note)
  }

  static async getAll() {
    return await Notes.find({})
  }

  static async getById(id) {
    return await Notes.findById(id)
  }

  static async delete(id) {
    return await Notes.findByIdAndRemove(id)
  }

  static async update(id, data) {
    if ((await Notes.updateOne({ _id: id }, { $set: data })).ok)
      return Notes.findById(id)
  }
}

module.exports = DataBase
