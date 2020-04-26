const redis = require('redis')
const { promisify } = require('util')
const client = redis.createClient(process.env.REDIS_URL)
const get = promisify(client.get).bind(client)
const set = promisify(client.setex).bind(client)

exports.setCache = async (name, time, data) => {
  return set(name, time, data)
}

exports.getCache = (name) => {
  return get(name)
}
