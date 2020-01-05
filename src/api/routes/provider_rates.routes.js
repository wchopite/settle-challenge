const routes = [];

module.exports = ({ProviderRatesController}) => {
  routes.push(
    {
      method: ['GET'],
      path: '/api/provider_rates',
      handler: ProviderRatesController.findAll,
    },
    {
      method: ['GET'],
      path: '/api/provider_rates/last',
      handler: ProviderRatesController.findLast,
    },
    {
      method: ['POST'],
      path: '/api/provider_rates',
      handler: ProviderRatesController.new,
    },
  );

  return routes;
};
