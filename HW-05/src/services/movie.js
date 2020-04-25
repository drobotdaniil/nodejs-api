const Movie = require('../models/Movie')
const DB = require('../helpers/AbstractClass')

class MovieService {
  static async getAll() {
    return DB.findAll(Movie)
  }

  static async getById(id) {
    return DB.getById(Movie, id)
  }

  static async save(req) {
    return DB.save(Movie, req)
  }

  static async update(req) {
    return DB.update(Movie, req)
  }

  static async delete(id) {
    return DB.delete(Movie, id)
  }
}

module.exports = MovieService
