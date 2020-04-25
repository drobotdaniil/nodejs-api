const { ObjectId } = require('mongodb').ObjectId
const Connect = require('../helpers/mongo-connect')

class DatabaseService {
  static async init() {
    const client = await Connect()
    const db = client.db('notesList')
    const notes = db.collection('Notes')
    return notes
  }

  static async saveNote(data) {
    const Notes = await DatabaseService.init()
    const { result } = await Notes.insertOne(data)

    if (result.ok) {
      return 'Saved'
    } else {
      throw new Error('Smthing went wrong')
    }
  }

  static async getAll() {
    const Notes = await DatabaseService.init()
    return Notes.find({}).toArray()
  }

  static async getById(id) {
    const Notes = await DatabaseService.init()
    return Notes.findOne({ _id: ObjectId(id) })
  }

  static async delete(id) {
    const Notes = await DatabaseService.init()
    return Notes.findOneAndDelete({ _id: ObjectId(id) })
  }

  static async update(id, data) {
    const Notes = await DatabaseService.init()

    const { ok } = await Notes.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: data }
    )
    if (ok) {
      return Notes.findOne({ _id: ObjectId(id) })
    } else {
      throw new Error('smthing went wrong')
    }
  }
}

module.exports = DatabaseService
