const ProviderRatesController = {};

ProviderRatesController.findAll = ({ProviderRateService}) => {
  return async (req, res) => {
    let filter = (req.query.provider) ? {provider: req.query.provider} : undefined;

    const provider_rates = await ProviderRateService.find(filter);

    if (provider_rates.length === 0) {
      return res
        .response({message: 'rates for specified provider, not found'})
        .code(404)
        .type('application/json');
    }

    return res.response(provider_rates).type('application/json');
  };
};

ProviderRatesController.findLast = ({ProviderRateService}) => {
  return async (req, res) => {
    let filter = (req.query.provider) ? {provider: req.query.provider} : undefined;

    let provider_rate = await ProviderRateService.findOne(filter);

    if (provider_rate.length === 0) {
      return res
        .response({message: 'rate for specified provider, not found'})
        .code(404)
        .type('application/json');
    }

    return res.response(provider_rate[0]).type('application/json');
  };
};

ProviderRatesController.new = ({ProviderRateService}) => {
  return async (req, res) => {
    let data = (req.payload.provider) ? {provider: req.payload.provider} : undefined;

    if (!data) {
      return res
        .response({message: 'You must indicate the provider'})
        .code(400)
        .type('application/json');
    }

    try {
      const newRate = await ProviderRateService.new(data);
      return res.response(newRate.ops[0]).type('application/json');
    } catch(err) {
      if (err.message === 'ProviderNotAllowed') {
        return res
          .response({message: 'Provider not allowed'})
          .code(400)
          .type('application/json');
      }
      return err;
    }
  };
};

module.exports = ({ProviderRateService, }) => {
  return {
    findAll: ProviderRatesController.findAll({ProviderRateService}),
    findLast: ProviderRatesController.findLast({ProviderRateService}),
    new: ProviderRatesController.new({ProviderRateService}),
  };
};
