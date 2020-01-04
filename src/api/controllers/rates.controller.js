const RatesController = {};

RatesController.find = ({RateService}) => {
  return async (req, res) => {
    let provider = (req.query.provider) ? {provider: req.query.provider} : undefined;
    let pairs = (req.query.pairs) ?
      req.query.pairs.split(',')
      : [];

    if (pairs.length === 0) {
      return res
        .response({message: 'You must indicate the pairs'})
        .code(400)
        .type('application/json');
    }

    let list = await RateService.find({provider, pairs});

    // const rates = await RateService.findAll();
    return res.response(list).type('application/json');
  };
};

module.exports = ({RateService}) => {
  return {
    find: RatesController.find({RateService}),
  };
};
