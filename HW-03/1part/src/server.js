const http = require('http')
const url = require('url')
const controller = require('./controllers')
const header = require('./headers')
const utils = require('./utilities')
require('./mongo-connect')

const port = 3000


const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true)

  switch (req.method) {
    case 'GET':
      if (reqUrl.pathname === '/api/tasks') {
        if (reqUrl.query.id) {
          controller.getById(reqUrl.query.id, res)
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
      controller.updateNote(req, res)

      break

    case 'OPTIONS':
      utils.sendResponse(res, '', 200, header.corsHeaders)

      break

    case 'DELETE':
      if (reqUrl.pathname === '/api/delete') {
        controller.deleteNote(reqUrl.query.id, res)
      }

      break
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
