const DB = require('./DB')

class DocumentService {
  static getAll() {
    return DB.getAll('documents')
  }

  static getById(id) {
    return DB.getById(id, 'documents')
  }

  static async save(req) {
    const body = await DocumentService.getBody(req)
    return DB.save('documents', 'content', body.content)
  }

  static async update(req) {
    const body = await DocumentService.getBody(req)

    return DB.update('documents', 'content', body.id, body.data.content)
  }

  static async getBody(req) {
    let body = ''

    for await (const chunk of req) {
      body += chunk
    }

    return JSON.parse(body)
  }

  static delete(id) {
    return DB.delete('documents', id)
  }

  static set(id, managerId) {
    return DB.setDoc(id, managerId)
  }
}

module.exports = DocumentService
