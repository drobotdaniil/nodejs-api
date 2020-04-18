const { createServer } = require('http')
const service = require('./services/services')
const { parse } = require('url')

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
  const { name } = parse(req.url, true).query
  if (name) {
    try {
      const cache = await service.getCache(name)

      if (cache !== null) {
        res.end(cache)
      } else {
        const data = await service.getWikiData(name)
        await service.setCache(name, 3600, data)

        res.end(data)
      }
    } catch (err) {
      console.log(err)
      res.end('err')
    }
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
