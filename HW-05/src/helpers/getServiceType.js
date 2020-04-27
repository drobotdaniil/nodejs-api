const MovieService = require('../services/movie')
const DirectorService = require('../services/director')
const GenreService = require('../services/genre')
const { Director, Genre, Movie }  = require('../constants/services.names')

exports.getServiceType = (type) => {
  let service

  switch (type) {
    case Movie:
      service = MovieService
      break

    case Director:
      service = DirectorService
      break

    case Genre:
      service = GenreService
      break
  }

  return service
}