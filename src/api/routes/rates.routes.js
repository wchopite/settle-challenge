const routes = [];

module.exports = ({RatesController}) => {
  routes.push(
    {
      method: ['GET'],
      path: '/api/rates/{pairs}',
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
