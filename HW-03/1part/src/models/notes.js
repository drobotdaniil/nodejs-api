const { ObjectId } = require('mongodb').ObjectId
const Connect = require('../mongo-connect')

class DataBase {
  static async init() {
    const client = await Connect()
    const db = client.db('notesList')
    const notes = db.collection('Notes')
    return notes
  }

  static async saveNote(data) {
    const Notes = await DataBase.init()

    let note = { title: data.title, text: data.text }

    return (await Notes.insertOne(note)).result
  }

  static async getAll() {
    const Notes = await DataBase.init()
    return await Notes.find({}).toArray()
  }

  static async getById(id) {
    const Notes = await DataBase.init()
    return await Notes.findOne({ _id: ObjectId(id) })
  }

  static async delete(id) {
    const Notes = await DataBase.init()
    return await Notes.findOneAndDelete({ _id: ObjectId(id) })
  }

  static async update(id, data) {
    const Notes = await DataBase.init()
    if (
      (await Notes.findOneAndUpdate({ _id: ObjectId(id) }, { $set: data })).ok
    )
      return await Notes.findOne({ _id: ObjectId(id) })
  }
}

module.exports = DataBase
