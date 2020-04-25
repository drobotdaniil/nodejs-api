const config = require('../config/db')
const { Client } = require('pg')

const client = new Client(config)

;(async () => {
  try {
    await client.connect()
    await client.query(`CREATE TABLE IF NOT EXISTS managers(
      id SERIAL PRIMARY KEY, 
      name CHARACTER VARYING(30)
      )`)
    await client.query(`CREATE TABLE IF NOT EXISTS documents(
      id SERIAL PRIMARY KEY, 
      managerId INTEGER REFERENCES managers(id) ON DELETE SET NULL,
      content TEXT 
      )`)
  } catch (err) {
    console.error(err)
  }
})()

module.exports = client
