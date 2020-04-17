exports.ok = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

exports.error404 = {
  'Content-Type': 'text/plain',
  'Access-Control-Allow-Origin': '*'
}

exports.error500 = {
  'Content-Type': 'text/plain',
  'Access-Control-Allow-Origin': '*'
}

exports.corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Credentials": false,
  "Access-Control-Max-Age": '86400',
  "Access-Control-Allow-Headers": "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, cache-control"
}