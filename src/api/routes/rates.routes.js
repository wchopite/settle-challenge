const routes = [];

module.exports = ({RatesController}) => {
  routes.push(
    {
      method: ['GET'],
      path: '/rates',
      handler: RatesController.find,
    },
  );

  return routes;
};
