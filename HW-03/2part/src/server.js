const { createServer } = require('http')
const controller = require('./controller')

const PORT = process.env.PORT || 3000

const server = createServer(async (req, res) => {
  if (req.method === 'GET') {
    controller.getData(req, res)
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})
