const Director = require('../models/Director')
const DB = require('../helpers/AbstractClass')

class DirectorService {
  static async getAll() {
    return DB.findAll(Director)
  }

  static async getById(id) {
    return DB.getById(Director, id)
  }

  static async save(req) {
    return DB.save(Director, req)
  }

  static async update(req) {
    return DB.update(Director, req)
  }

  static async delete(id) {
    return DB.delete(Director, id)
  }
}

module.exports = DirectorService
