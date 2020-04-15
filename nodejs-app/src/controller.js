const http = require('http')
const url = require('url')
const NodeAPI = require('./service.js')
const header = require('./headers')
const utils = require('./utilities')

module.exports = http.createServer( async (req, res) => {
  const reqUrl = url.parse(req.url, true)

  if (req.method === 'GET') {
    if (reqUrl.pathname === '/api/tasks') {
      try {
        const allTasks = await NodeAPI.getAll()
        
        if (reqUrl.query.id) {
          const task = await NodeAPI.getById(reqUrl.query.id)
          
          if (!task) {
            utils.sendResponse(res, 'Not found', 404, header.error404)
          } else {
            utils.sendResponse(res, task, 200, header.ok)
          }
        } else {
          utils.sendResponse(res, JSON.stringify(allTasks), 200, header.ok)
        }
      } catch (error) {
        utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
        throw error
      }
    } else {
      utils.sendResponse(res, 'Not found', 404, header.error404)
    }
  } else if (req.method === 'POST') {
    if (reqUrl.pathname === '/api/save') {
      NodeAPI.save(req, res)
    }
  } else if (req.method === 'OPTIONS') {
    utils.sendResponse(res, '', 200, header.corsHeaders)
  } else if (req.method === 'DELETE') {
    if (reqUrl.pathname === '/api/delete') {
      try {
        const task = await NodeAPI.delete(reqUrl.query.id)

        utils.sendResponse(res, task, 200, header.ok)
      } catch (error) {
        utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
      }
    }
  }
})