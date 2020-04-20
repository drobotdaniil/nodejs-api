const MongoClient = require('mongodb').MongoClient
const config = require('./config/config')

async function Connect() {
  const mongoClient = new MongoClient(config.mongodb.uri, config.mongodb.config)
  try {
    await mongoClient.connect()
    return mongoClient
  } catch (err) {
    console.log(err)
  }
}

module.exports = Connect
