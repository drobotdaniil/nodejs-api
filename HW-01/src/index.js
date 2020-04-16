const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.end('Hello')
})

app.get('/about', (req, res) => {
  res.end('About page')
})

app.get('/test', (req, res) => {
  res.end('Test page 1233131')
})

const port = process.env.PORT || 3000

app.listen(port, (err) => {
  if (err) throw err

  console.log(`server is running on port: ${port}`)
})