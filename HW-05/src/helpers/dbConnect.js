const Sequelize = require('sequelize')
const config = require('../config/db')

const db = new Sequelize('nodejs-db', 'postgres', 'postgres', config)

;(async () => {
  try {
    await db.sync()
  } catch (err) {
    throw new Error()
  }
})()

module.exports = { db, Sequelize }
