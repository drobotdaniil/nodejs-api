const db = require('./database')


class Tasks {
  static async getById(id) {
    return await db.getTaskById(id)
  }

  static async delete(id) {
    return await db.deleteTasks(id)
  }

  static async save(req) {
    const tasksFromDB = await db.getAll()
    let result;
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    result = tasksFromDB.concat(JSON.parse(body))

    return await db.saveTasks(result)
  }
}

module.exports = Tasks