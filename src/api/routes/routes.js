module.exports = ({RatesController, ProviderRatesController}) => {
  const ratesRoutes = require('./rates.routes')({RatesController});
  const providerRatesRoutes = require('./provider_rates.routes')({ProviderRatesController});

  const routes = [
    // Global Health Check
    {
      method: ['GET'],
      path: '/',
      handler: (req, res) => {
        const message = {status: 'ok'};
        return res.response(message).type('application/json');
      },
    },
    ...ratesRoutes,
    ...providerRatesRoutes,
  ];

  return {
    name: 'ApiRoutes',
    register: async (server) => {
      server.route(routes);
    },
  };
};
