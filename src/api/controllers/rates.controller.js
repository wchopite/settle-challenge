const RatesController = {};

RatesController.find = ({RateService}) => {
  return async (req, res) => {
    let provider = (req.query.provider) ? {provider: req.query.provider} : undefined;
    let pairs = (req.params.pairs) ?
      req.params.pairs.split(',')
      : [];

    if (pairs.length === 0) {
      return res
        .response({message: 'You must indicate the pairs'})
        .code(400)
        .type('application/json');
    }

    let list = await RateService.find({provider, pairs});
    return res.response(list).type('application/json');
  };
};

RatesController.new = ({RateService}) => {
  return async (req, res) => {
    let { pair, fee_percent, provider } = req.payload;

    let result = await RateService.new({pair, fee_percent, provider});
    return res.response(result.ops[0]).type('application/json');
  };
};

module.exports = ({RateService}) => {
  return {
    find: RatesController.find({RateService}),
    new: RatesController.new({RateService}),
  };
};
