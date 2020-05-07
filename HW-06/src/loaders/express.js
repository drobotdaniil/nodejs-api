const express = require('express')
const initMiddleWarer = require('./configurations')

const app = express()

initMiddleWarer(app)

module.exports = app
