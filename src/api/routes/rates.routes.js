const routes = [];

module.exports = ({RatesController}) => {
  routes.push(
    {
      method: ['GET'],
      path: '/api/rates/{provider}/{pairs}',
      handler: RatesController.find,
    },
    {
      method: ['POST'],
      path: '/api/rates',
      handler: RatesController.new,
    },
  );

  return routes;
};
