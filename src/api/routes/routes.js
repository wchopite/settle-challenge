module.exports = ({RatesController, ProviderRatesController}) => {
  const ratesRoutes = require('./rates.routes')({RatesController});
  const providerRatesRoutes = require('./provider_rates.routes')({ProviderRatesController});

  const routes = [
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
