const Sequelize = require('sequelize')
const config = require('./config/db')

const db = new Sequelize('nodejs-db', 'postgres', 'postgres', config)

;(async () => {
  await db.sync()
})()

module.exports = { db, Sequelize }
