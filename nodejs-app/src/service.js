const fs = require('fs')
const path = require('path')
const utils = require('./utilities')
const header = require('./headers')


class NodeAPI {
  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, 'data', 'tasks.json'),
        'utf-8',
        (err, content) => {
          if (err) rej(err)
          
          res(JSON.parse(content))
        }
      )
    })
  }

  static async getById(id) {
    const tasks = await NodeAPI.getAll()
    if (tasks.find(task => task.id === id)) {
      return JSON.stringify([tasks.find(task => task.id === id)])
    } else {
      return false
    }
  }

  static async delete(id) {
    const tasks = await NodeAPI.getAll()

    const result = tasks.filter(task => task.id !== id)

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, 'data', 'tasks.json'),
        JSON.stringify(result),
        err => {
          if (err) rej(err)

          res(JSON.stringify(result))
        }
      )
    })
  }

  static async save(req, res) {
    const tasksFromDB = await NodeAPI.getAll()
    let result;
    let body = ''

    req.on('data', chunk => {
      body += chunk
    })

    req.on('end', () => {
      const postBody = JSON.parse(body)

      result = tasksFromDB.concat(postBody)
    
      utils.sendResponse(res, JSON.stringify(result), 200, header.ok)

      return new Promise((res, rej) => {
        fs.writeFile(
          path.join(__dirname, 'data', 'tasks.json'),
          JSON.stringify(result),
          err => {
            if (err) rej(err)
      
            res()
          }
        )
      })
    })

    req.on('error', () => {
      utils.sendResponse(res, '500 Internal Server Error', 500, header.error500)
    })
  }
}

module.exports = NodeAPI