exports.sendResponse = (res, data, statusCode, headers) => {
  res.writeHead(statusCode, headers);
  res.end(data);
}