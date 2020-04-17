const { createServer } = require('http')
const fetch = require('node-fetch')
const redis = require('redis')
const { parse } = require('url')

const PORT = process.env.PORT || 3000

const client = redis.createClient(process.env.REDIS_URL)

const server = createServer(async (req, res) => {
  const { name } = parse(req.url, true).query

  client.get(name, async (err, data) => {
    if (err) throw err

    if (data !== null) {
      res.end(data)
    } else {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${name}`
      )
      const data = await response.json()

      client.setex(name, 3600, JSON.stringify(data))
      res.end(JSON.stringify(data))
    }
  })
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
