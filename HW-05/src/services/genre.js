const Genre = require('../models/Genre')
const Movie = require('../models/Movie')
require('../models/Navigation')
const DB = require('../helpers/AbstractClass')

class GenreService {
  static getAll() {
    return DB.findAll(Genre)
  }

  static async setGenreToMovie({ genre, name }) {
    const movie = await Movie.findOne({ where: { name } })

    if (!movie) return 'Movie wasn\'t found'
    const genreFromDB = await Genre.findOne({ where: { title: genre } })

    if (!genreFromDB) return 'Genre wasn\'t found'
    movie.addGenre(genreFromDB)

    return 'OK'
  }

  static async getMoviesByGenre(title) {
    const genre = await Genre.findOne({ where: { title } })

    if (!genre) return 'Genre wasn\'t found'

    const movies = await genre.getMovies()

    return movies.length ? movies : `Movies with genre: '${title}' wasn't found`
  }

  static getById(id) {
    return DB.getById(Genre, id)
  }

  static save(body) {
    return DB.save(Genre, body)
  }

  static update(body) {
    return DB.update(Genre, body)
  }

  static delete(id) {
    return DB.delete(Genre, id)
  }
}

module.exports = GenreService
