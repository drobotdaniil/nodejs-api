const { createServer } = require('http')
const { parse } = require('url')
const { sendResponse } = require('./utilities')
const { error404, corsHeaders } = require('./headers')
const mngrCtrl = require('./controllers/managerCtrl')
const docCtrl = require('./controllers/documentCtrl')

const client = require('./pg-connect')

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
  const reqURL = parse(req.url, true)
  switch (req.method) {
    case 'GET':
      if (reqURL.pathname === '/api/managers') {
        if (reqURL.query.id) {
          mngrCtrl.getById(reqURL.query.id, res)
        } else {
          mngrCtrl.getAllManagers(res)
        }
      } else if (reqURL.pathname === '/api/documents') {
        if (reqURL.query.id) {
          docCtrl.getById(reqURL.query.id, res)
        } else {
          docCtrl.getAll(res)
        }
      } else {
        sendResponse(res, 'Not Found', 404, error404)
      }

      break

    case 'POST':
      if (reqURL.pathname === '/api/managers/save') {
        mngrCtrl.saveManager(req, res)
      } else if (reqURL.pathname === '/api/documents/save') {
        docCtrl.saveDoc(req, res)
      }

      break

    case 'PUT':
      if (reqURL.pathname === '/api/managers/update') {
        mngrCtrl.updateManager(req, res)
      } else if (reqURL.pathname === '/api/documents/update') {
        docCtrl.updateDoc(req, res)
      } else if (reqURL.pathname === '/api/documents/set-manager') {
        docCtrl.setDoc(reqURL.query.id, reqURL.query.managerId, res)
      }

      break

    case 'OPTIONS':
      sendResponse(res, '', 200, corsHeaders)
      break

    case 'DELETE':
      if (reqURL.pathname === '/api/managers/delete') {
        mngrCtrl.deleteManager(reqURL.query.id, res)
      } else if (reqURL.pathname === '/api/documents/delete') {
        docCtrl.deleteDoc(reqURL.query.id, res)
      }

      break
  }
})

server.listen(PORT, () => {
  console.log(`Server started on ${PORT}`)
})
