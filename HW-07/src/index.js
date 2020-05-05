const createHapiServer = require('./hapi');
const createExpressServer = require('./express');
const createKoaServer = require('./koa');

const dbContext = require('./database/models');

createHapiServer();
createExpressServer(dbContext);
createKoaServer(dbContext);
