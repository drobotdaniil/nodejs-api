const { createServer } = require('http')
const { parse } = require('url')
const { sendResponse } = require('./helpers/utilities')
const { error404, corsHeaders } = require('./helpers/headers')
const managerController = require('./controllers/manager')
const documentController = require('./controllers/document')
require('./helpers/db-connect')

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
  const reqURL = parse(req.url, true)
  switch (req.method) {
    case 'GET':
      if (reqURL.pathname === '/api/managers') {
        if (reqURL.query.id) {
          managerController.getById(req, res)
        } else {
          managerController.getAllManagers(res)
        }
      } else if (reqURL.pathname === '/api/documents') {
        if (reqURL.query.id) {
          documentController.getById(req, res)
        } else {
          documentController.getAll(res)
        }
      } else {
        sendResponse(res, 'Not Found', 404, error404)
      }

      break

    case 'POST':
      if (reqURL.pathname === '/api/managers/save') {
        managerController.saveManager(req, res)
      } else if (reqURL.pathname === '/api/documents/save') {
        documentController.saveDoc(req, res)
      }

      break

    case 'PUT':
      if (reqURL.pathname === '/api/managers/update') {
        managerController.updateManager(req, res)
      } else if (reqURL.pathname === '/api/documents/update') {
        documentController.updateDoc(req, res)
      } else if (reqURL.pathname === '/api/documents/set-manager') {
        documentController.setDoc(req, res)
      }

      break

    case 'OPTIONS':
      sendResponse(res, '', 200, corsHeaders)
      break

    case 'DELETE':
      if (reqURL.pathname === '/api/managers/delete') {
        managerController.deleteManager(req, res)
      } else if (reqURL.pathname === '/api/documents/delete') {
        documentController.deleteDoc(req, res)
      }

      break
  }
})

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
