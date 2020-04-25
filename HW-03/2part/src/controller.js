const { parse } = require('url')
const WikiService = require('./services/wikipedia')
const CacheService = require('./services/cache')

exports.getData = async (req, res) => {
  const { name } = parse(req.url, true).query

  if (name) {
    try {
      const cache = await CacheService.getCache(name)

      if (cache !== null) {
        res.end(cache)
      } else {
        const data = await WikiService.getWikiData(name)
        await CacheService.setCache(name, 3600, data)

        res.end(data)
      }
    } catch (err) {
      console.log(err)
      res.end('Something went wrong')
    }
  }
}