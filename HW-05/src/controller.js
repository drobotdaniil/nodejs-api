const MovieService = require('./services/movie')
const DirectorService = require('./services/director')
const GenreService = require('./services/genre')
const { sendResponse } = require('./helpers/utilities')
const { ok, error404, error500 } = require('./headers')

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

exports.getById = async (type, id, res) => {
  try {
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
    const data = await service.save(req)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.delete = async (type, id, res) => {
  try {
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
    const data = await service.update(req)

    sendResponse(res, data, 200, ok)
  } catch (err) {
    console.error(err)
    sendResponse(res, '500 Internal Server Error', 500, error500)
  }
}

exports.setDirector = async (type, req, res) => {
  try {
    const service = serviceType(type)
    const data = await service.update(req)

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
