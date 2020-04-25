const { createServer } = require('http')
const { parse } = require('url')
const { sendResponse } = require('./helpers/utilities')
const { error404, corsHeaders } = require('./headers')
const controller = require('./controller')
require('./db-connect')

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
  const reqURL = parse(req.url, true)
  switch (req.method) {
    case 'GET':
      if (reqURL.pathname === '/api/directors') {
        if (reqURL.query.id) {
          controller.getById('Director', reqURL.query.id, res)
        } else {
          controller.getAll('Director', res)
        }
      } else if (reqURL.pathname === '/api/movies') {
        if (reqURL.query.id) {
          controller.getById('Movie', reqURL.query.id, res)
        } else {
          controller.getAll('Movie', res)
        }
      } else if (reqURL.pathname === '/api/genres') {
        if (reqURL.query.id) {
          controller.getById('Genre', reqURL.query.id, res)
        } else {
          controller.getAll('Genre', res)
        }
      } else {
        sendResponse(res, 'Not Found', 404, error404)
      }

      break

    case 'POST':
      if (reqURL.pathname === '/api/directors/save') {
        controller.save('Director', req, res)
      } else if (reqURL.pathname === '/api/movies/save') {
        controller.save('Movie', req, res)
      } else if (reqURL.pathname === '/api/genres/save') {
        controller.save('Genre', req, res)
      }

      break

    case 'PUT':
      if (reqURL.pathname === '/api/directors/update') {
        controller.update('Director', req, res)
      } else if (reqURL.pathname === '/api/movies/update') {
        controller.update('Movie', req, res)
      } else if (reqURL.pathname === '/api/movies/set-director') {
        controller.setDirector('Movie', req, res)
      } else if (reqURL.pathname === '/api/genres/update') {
        controller.update('Genre', req, res)
      }

      break

    case 'OPTIONS':
      sendResponse(res, '', 200, corsHeaders)
      break

    case 'DELETE':
      if (reqURL.pathname === '/api/directors/delete') {
        controller.delete('Director', reqURL.query.id, res)
      } else if (reqURL.pathname === '/api/movies/delete') {
        controller.delete('Movie', reqURL.query.id, res)
      } else if (reqURL.pathname === '/api/genres/delete') {
        controller.delete('Genre', reqURL.query.id, res)
      }

      break
  }
})

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
