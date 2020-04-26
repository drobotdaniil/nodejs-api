const DatabaseService = require('./database')

class ManagerService {
  static getAll() {
    return DatabaseService.getAll('managers')
  }

  static getById(id) {
    return DatabaseService.getById(id, 'managers')
  }

  static save({ name }) {
    return DatabaseService.save('managers', 'name', name)
  }

  static update({id, name}) {
    return DatabaseService.update('managers', 'name', id, name)
  }

  static delete(id) {
    return DatabaseService.delete('managers', id)
  }
}

module.exports = ManagerService
