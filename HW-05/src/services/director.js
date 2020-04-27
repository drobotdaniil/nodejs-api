const Director = require('../models/Director')
const DB = require('../helpers/database')

class DirectorService {
  static getAll() {
    return DB.findAll(Director)
  }

  static async getMoviesByDirector(id) {
    const director = await Director.findByPk(id)
    if (!director) {
      throw new Error('Not found')
    }
    
    return director.getMovies()
  }

  static getById(id) {
    return DB.getById(Director, id)
  }

  static save(body) {
    return DB.save(Director, body)
  }

  static update(body) {
    return DB.update(Director, body)
  }

  static delete(id) {
    return DB.delete(Director, id)
  }
}

module.exports = DirectorService
