const https = require('https')
const credentials = require('./loaders/credentials')
const app = require('./loaders/express')

const PORT = process.env.PORT || 3000
const server = https.createServer(credentials, app)

server.listen(PORT, () => {
  console.log(`server is running on https://localhost:${PORT}`)
})
