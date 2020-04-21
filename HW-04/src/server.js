const { createServer } = require('http')
const { parse } = require('url')
const { Client } = require('pg')
const config = require('./config/db')
const PORT = process.env.PORT || 3000

const client = new Client(config)

const server = createServer(async (req, res) => {
  const reqURL = parse(req.url, true)

  if (reqURL.pathname === '/api/get') {
    const database = await client.query(
      'SELECT * FROM managers ORDER BY Id ASC'
    )

    res.end(
      JSON.stringify(database.rows)
    )
  } else if (reqURL.pathname === '/test') {
    const text = 'INSERT INTO managers(Name) VALUES($1) RETURNING *'
    const values = ['brianc']

    const data = await client.query(text, values)

    res.end(JSON.stringify(data.rows[0]))
  }
})

;(async () => {
  try {
    await client.connect()
    await client.query(`CREATE TABLE IF NOT EXISTS managers(
      id SERIAL PRIMARY KEY, 
      Name CHARACTER VARYING(30)
      );`)
    await client.query(`CREATE TABLE IF NOT EXISTS documents(
      Id SERIAL PRIMARY KEY, 
      Content TEXT 
      );`)

    server.listen(PORT, () => {
      console.log(`Server started on ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
})()
