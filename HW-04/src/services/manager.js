const DB = require('./DB')

class ManagerService {
  static getAll() {
    return DB.getAll('managers')
  }

  static getById(id) {
    return DB.getById(id, 'managers')
  }

  static async save(req) {
    const body = await ManagerService.getBody(req)
    return DB.save('managers', 'name', body.name)
  }

  static async update(req) {
    const body = await ManagerService.getBody(req)

    return DB.update('managers', 'name', body.id, body.data.name)
  }

  static async getBody(req) {
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    return JSON.parse(body)
  }

  static delete(id) {
    return DB.delete('managers' ,id)
  }
}

module.exports = ManagerService
