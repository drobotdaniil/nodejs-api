const Genre = require('../models/Genre')
const DB = require('../helpers/AbstractClass')

class GenreService {
  static async getAll() {
    return DB.findAll(Genre)
  }

  static async getById(id) {
    return DB.getById(Genre, id)
  }

  static async save(req) {
    return DB.save(Genre, req)
  }

  static async update(req) {
    return DB.update(Genre, req)
  }

  static async delete(id) {
    return DB.delete(Genre, id)
  }
}

module.exports = GenreService
