const RatesController = {};

RatesController.find = ({RateService}) => {
  return async (req, res) => {
    let provider = req.params.provider || undefined;
    let pairs = req.params.pairs || undefined;

    let list = await RateService.find({provider, pairs});

    if (list.length === 0) {
      return res
        .response({message: 'rates for specified provider and pairs, not found'})
        .code(404)
        .type('application/json');
    }

    return res.response(list).type('application/json');
  };
};

RatesController.new = ({RateService}) => {
  return async (req, res) => {
    let { pair, fee_percent, provider } = req.payload;

    if (!pair || !fee_percent || !provider) {
      return res
        .response({message: 'You must indicate pair, fee_percent and provider'})
        .code(400)
        .type('application/json');
    }

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
