const fetch = require('node-fetch')
const redis = require('redis')
const { promisify } = require('util')

exports.getWikiData = async (value) => {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${value}`
  )
  const data = await response.json()

  return JSON.stringify(data)
}

exports.setCache = async (name, time, data) => {
  const client = redis.createClient(process.env.REDIS_URL)
  const set = promisify(client.setex).bind(client)

  return set(name, time, data)
}

exports.getCache = (name) => {
  const client = redis.createClient(process.env.REDIS_URL)
  const get = promisify(client.get).bind(client)

  return get(name)
}