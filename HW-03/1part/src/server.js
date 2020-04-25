const http = require('http')
const url = require('url')
const controller = require('./controllers')
const header = require('./helpers/headers')
const utils = require('./helpers/utilities')
require('./helpers/mongo-connect')

const port = 3000


const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true)

  switch (req.method) {
    case 'GET':
      if (reqUrl.pathname === '/api/tasks') {
        if (reqUrl.query.id) {
          controller.getById(req, res)
        } else {
          controller.getAllNotes(res)
        }
      } else {
        utils.sendResponse(res, 'Not found', 404, header.error404)
      }

      break

    case 'POST':
      if (reqUrl.pathname === '/api/save') {
        controller.saveNote(req, res)
      }

      break
    
    case 'PUT':
      if (reqUrl.pathname === '/api/update') {
        controller.updateNote(req, res)
      }

      break

    case 'OPTIONS':
      utils.sendResponse(res, '', 200, header.corsHeaders)

      break

    case 'DELETE':
      if (reqUrl.pathname === '/api/delete') {
        controller.deleteNote(req, res)
      }

      break
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
