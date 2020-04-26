const Movie = require('../models/Movie')
const DB = require('../helpers/AbstractClass')

class MovieService {
  static getAll() {
    return DB.findAll(Movie)
  }

  static getById(id) {
    return DB.getById(Movie, id)
  }

  static save(body) {
    return DB.save(Movie, body)
  }

  static update(body) {
    return DB.update(Movie, body)
  }

  static delete(id) {
    return DB.delete(Movie, id)
  }
}

module.exports = MovieService
