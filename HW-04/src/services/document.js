const DatabaseService = require('./database')

class DocumentService {
  static getAll() {
    return DatabaseService.getAll('documents')
  }

  static getById(id) {
    return DatabaseService.getById(id, 'documents')
  }

  static save({content}) {
    return DatabaseService.save('documents', 'content', content)
  }

  static update({id, content}) {
    return DatabaseService.update('documents', 'content', id, content)
  }

  static delete(id) {
    return DatabaseService.delete('documents', id)
  }

  static set(id, managerId) {
    return DatabaseService.setDoc(id, managerId)
  }
}

module.exports = DocumentService
