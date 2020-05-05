const Hapi = require('@hapi/hapi');

const router = require('./routes');

const authMiddleware = require('./middlewares/auth-middleware');

const PORT = 3001;

async function createHapiServer() {
  const server = Hapi.Server({
    port: PORT,
    host: 'localhost'
  });

  await server.register(require('hapi-auth-jwt2'));

  // https://hapi.dev/tutorials/auth/?lang=en_US
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET_KEY,
    validate: authMiddleware,
  });

  // server.auth.default('jwt');

  server.route(router);

  server.ext('onRequest', (req, h) => {
    console.log(`Hapi time: ${Date.now()}`);
    return h.continue;
  });

  server.start().then(() => console.log(`Hapi server running on http://localhost:${PORT}`));
}

module.exports = createHapiServer;
