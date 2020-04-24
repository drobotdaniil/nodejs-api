const http = require('http')
const url = require('url')
const controller = require('./controllers')
const header = require('./headers')
const utils = require('./utilities')

const port = 3000

const server = http.createServer(async (req, res) => {
  const reqUrl = url.parse(req.url, true)

  switch (req.method) {
    case 'GET':
      if (reqUrl.pathname === '/api/tasks') {
        try {
          if (reqUrl.query.id) {
            await controller.getById(reqUrl.query.id, res)
          } else {
            await controller.getAllTasks(req, res)
          }
        } catch (error) {
          utils.sendResponse(
            res,
            '500 Internal Server Error',
            500,
            header.error500
          )
          throw error
        }
      } else {
        utils.sendResponse(res, 'Not found', 404, header.error404)
      }

      break

    case 'POST':
      if (reqUrl.pathname === '/api/save') {
        try {
          await controller.saveTask(req, res)
        } catch (error) {
          utils.sendResponse(
            res,
            '500 Internal Server Error',
            500,
            header.error500
          )
        }
      }

      break

    case 'OPTIONS':
      utils.sendResponse(res, '', 200, header.corsHeaders)

      break

    case 'DELETE':
      if (reqUrl.pathname === '/api/delete') {
        try {
          await controller.deleteTask(reqUrl.query.id, res)
        } catch (error) {
          utils.sendResponse(
            res,
            '500 Internal Server Error',
            500,
            header.error500
          )
        }
      }

      break
  }
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})