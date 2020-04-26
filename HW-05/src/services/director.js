const Director = require('../models/Director')
const DB = require('../helpers/AbstractClass')

class DirectorService {
  static getAll() {
    return DB.findAll(Director)
  }

  static async getMoviesByDirector(id) {
    const director = await Director.findByPk(id)
    if (!director) return 'Not found'
    
    const movies = await director.getMovies()

    return movies.length ? movies : `Movies with directorId: '${id}' wasn't found`   
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
