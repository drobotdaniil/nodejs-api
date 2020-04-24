const fs = require('fs').promises
const path = require('path')

class DataBase {
  static async getAll() {
    return JSON.parse(
      await fs.readFile(path.join(__dirname, '..', 'data', 'tasks.json'))
    )
  }

  static async getTaskById(id) {
    const tasks = await DataBase.getAll()

    if (tasks.find(task => task.id === id)) {
      return JSON.stringify([tasks.find(task => task.id === id)])
    } else {
      return false
    }
  }

  static async deleteTasks(id) {
    const tasks = await DataBase.getAll()

    const result = tasks.filter(task => task.id !== id)

    return await DataBase.saveTasks(result)
  }

  static async saveTasks(tasks) {
    await fs.writeFile(
      path.join(__dirname, '..', 'data', 'tasks.json'),
      JSON.stringify(tasks)
    )

    return JSON.stringify(await DataBase.getAll())
  }
}

module.exports = DataBase
