exports.getBody = async (req) => {
  let body = ''

  for await(const chunck of req) {
    body += chunck
  }
  
  return JSON.parse(body)
}