const routes = [];

module.exports = ({ProviderRatesController}) => {
  routes.push(
    {
      method: ['GET'],
      path: '/provider_rates',
      handler: ProviderRatesController.findAll,
    },
    {
      method: ['GET'],
      path: '/provider_rates/last',
      handler: ProviderRatesController.findLast,
    },
    {
      method: ['POST'],
      path: '/provider_rates',
      handler: ProviderRatesController.new,
    },
  );

  return routes;
};
