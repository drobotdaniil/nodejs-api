const MovieService = require('./services/movie')
const DirectorService = require('./services/director')
const GenreService = require('./services/genre')
const { sendResponse } = require('./helpers/utilities')
const { ok, error404, error500 } = require('./helpers/headers')
const { getBody } = require('./helpers/getBody')
const { parse } = require('url')

exports.getMoviesByDirector = async (req, res) => {
  try {
    const { directorId: id } = parse(req.url, true).query
    const data = await DirectorService.getMoviesByDirector(id)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Smthing went wrong', 500, error500)
  }
}

exports.setGenreToMovie = async (req, res) => {
  try {
    const body = await getBody(req)
    const data = await GenreService.setGenreToMovie(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Smthing went wrong', 500, error500)
  }
}

exports.getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = parse(req.url, true).query
    const data = await GenreService.getMoviesByGenre(genre)
    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Smthing went wrong', 500, error500)
  }
}

exports.getAll = async (type, res) => {
  try {
    const service = serviceType(type)
    const data = await service.getAll()

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.getById = async (type, req, res) => {
  try {
    const { id } = parse(req.url, true).query
    const service = serviceType(type)
    const data = await service.getById(id)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, 'Not found', 404, error404)
  }
}

exports.save = async (type, req, res) => {
  try {
    const service = serviceType(type)
    const body = await getBody(req)
    const data = await service.save(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.delete = async (type, req, res) => {
  try {
    const { id } = parse(req.url, true).query
    const service = serviceType(type)
    await service.delete(id)

    sendResponse(res, 'DELETED', 200, ok)
  } catch (err) {
    console.log(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.update = async (type, req, res) => {
  try {
    const service = serviceType(type)
    const body = await getBody(req)
    const data = await service.update(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.setDirector = async (type, req, res) => {
  try {
    const service = serviceType(type)
    const body = await getBody(req)
    const data = await service.update(body)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

const serviceType = (type) => {
  let service

  switch (type) {
    case 'Movie':
      service = MovieService
      break

    case 'Director':
      service = DirectorService
      break

    case 'Genre':
      service = GenreService
      break
  }

  return service
}
