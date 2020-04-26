const { ObjectId } = require('mongodb').ObjectId
const Connect = require('../helpers/mongo-connect')

class DatabaseService {
  static async init() {
    const client = await Connect()
    const db = client.db('notesList')
    const notes = db.collection('Notes')
    return { client, notes }
  }

  static async saveNote(data) {
    const { notes: Notes, client } = await DatabaseService.init()
    const { result } = await Notes.insertOne(data)
    client.close()

    if (result.ok) {
      return 'Saved'
    } else {
      throw new Error('Smthing went wrong')
    }
  }

  static async getAll() {
    const { notes: Notes, client } = await DatabaseService.init()
    const result = Notes.find({}).toArray()

    client.close()

    return result
  }

  static async getById(id) {
    const { notes: Notes, client } = await DatabaseService.init()
    const result = Notes.findOne({ _id: ObjectId(id) })
    client.close()
    return result
  }

  static async delete(id) {
    const { notes: Notes, client } = await DatabaseService.init()
    const result = Notes.findOneAndDelete({ _id: ObjectId(id) })
    client.close()
    return result
  }

  static async update(id, data) {
    const { notes: Notes, client } = await DatabaseService.init()

    const { ok } = await Notes.findOneAndUpdate({ _id: ObjectId(id) }, { $set: data })

    if (ok) {
      const result = Notes.findOne({ _id: ObjectId(id) })
      client.close()
      return result
    } else {
      throw new Error('smthing went wrong')
    }
  }
}

module.exports = DatabaseService
