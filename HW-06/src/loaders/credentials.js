const fs = require('fs')
const { join } = require('path')

const key = fs.readFileSync(join(__dirname, '..', 'certs', 'selfsigned.key'))
const cert = fs.readFileSync(join(__dirname, '..', 'certs', 'selfsigned.crt'))


const credentials = { key, cert }

module.exports = credentials