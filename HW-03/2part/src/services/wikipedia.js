const fetch = require('node-fetch')

exports.getWikiData = async (value) => {
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${value}`
  )
  const data = await response.json()

  return JSON.stringify(data)
}