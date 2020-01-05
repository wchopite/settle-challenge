const routes = [];

module.exports = ({RatesController}) => {
  routes.push(
    {
      method: ['GET'],
      path: '/api/rates',
      handler: RatesController.find,
    },
  );

  return routes;
};
