const hapi = require('@hapi/hapi');
const hapiSwaggered = require('hapi-swaggered');
const hapiSwaggeredUi = require('hapi-swaggered-ui');
const hapiVision = require('@hapi/vision');
const inert = require('@hapi/inert');
// const joi = require('joi');

const routes = require('./interfaces/v1/index');

const plugins = [
  inert,
  hapiVision,
  {
    plugin: hapiSwaggered,
    options: {
      stripPrefix: '/api',
      info: {
        title: 'API',
        description: 'Swagger',
        version: '1.0.1',
      },
    },
  },
  {
    plugin: hapiSwaggeredUi,
    options: {
      title: 'Swagger UI',
      path: '/docs',
      swaggerOptions: {
        validatorUrl: null,
      },
    },
  },
];
module.exports = async (application) => {
  const server = hapi.server({
    port: 3005,
    router: {
      isCaseSensitive: false,
    },
  });
  server.realm.modifiers.route.prefix = '/api';
  const allRoutes = routes(application);
  server.route(allRoutes);
  await server.register(plugins);
  return server;
};
