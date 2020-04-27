const { createServer } = require('http')
const { parse } = require('url')
const { sendResponse } = require('./helpers/utilities')
const { error404, corsHeaders } = require('./helpers/headers')
const { Director, Genre, Movie } = require('./constants/services.names')
const controller = require('./controller')
require('./helpers/dbConnect')

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
  const { pathname, query } = parse(req.url, true)
  const { id, directorId, genre } = query
  switch (req.method) {
    case 'GET':
      if (pathname === '/api/directors') {
        if (id) {
          controller.getById(Director, req, res)
        } else {
          controller.getAll(Director, res)
        }
      } else if (pathname === '/api/movies') {
        if (id) {
          controller.getById(Movie, req, res)
        } else if (genre) {
          controller.getMoviesByGenre(req, res)
        } else if (directorId) {
          controller.getMoviesByDirector(req, res)
        } else {
          controller.getAll(Movie, res)
        }
      } else if (pathname === '/api/genres') {
        if (id) {
          controller.getById(Genre, req, res)
        } else {
          controller.getAll(Genre, res)
        }
      } else {
        sendResponse(res, 'Not Found', 404, error404)
      }

      break

    case 'POST':
      if (pathname === '/api/directors') {
        controller.save(Director, req, res)
      } else if (pathname === '/api/movies') {
        controller.save(Movie, req, res)
      } else if (pathname === '/api/genres') {
        controller.save(Genre, req, res)
      } else if (pathname === '/api/movies/set-genre') {
        controller.setGenreToMovie(req, res)
      }

      break

    case 'PUT':
      if (pathname === '/api/directors') {
        controller.update(Director, req, res)
      } else if (pathname === '/api/movies') {
        controller.update(Movie, req, res)
      } else if (pathname === '/api/genres') {
        controller.update(Genre, req, res)
      }

      break

    case 'OPTIONS':
      sendResponse(res, '', 200, corsHeaders)
      break

    case 'DELETE':
      if (pathname === '/api/directors') {
        controller.delete(Director, req, res)
      } else if (pathname === '/api/movies') {
        controller.delete(Movie, req, res)
      } else if (pathname === '/api/genres') {
        controller.delete(Genre, req, res)
      }

      break
  }
})

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
