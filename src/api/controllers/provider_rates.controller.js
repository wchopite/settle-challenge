const ProviderRatesController = {};

ProviderRatesController.findAll = ({ProviderRateService}) => {
  return async (req, res) => {
    const provider_rates = await ProviderRateService.find();
    return res.response(provider_rates).type('application/json');
  };
};

ProviderRatesController.findLast = ({ProviderRateService}) => {
  return async (req, res) => {
    let filter = (req.query.provider) ? {provider: req.query.provider} : undefined;

    let provider_rate = await ProviderRateService.findOne(filter);

    if (provider_rate.length === 0) {
      provider_rate = {};
    }

    return res.response(provider_rate[0]).type('application/json');
  };
};

ProviderRatesController.new = ({ProviderRateService}) => {
  return async (req, res) => {
    let data = (req.payload.provider) ? {provider: req.payload.provider} : undefined;

    const newRate = await ProviderRateService.new(data);
    return res.response(newRate.ops[0]).type('application/json');
  };
};

module.exports = ({ProviderRateService}) => {
  return {
    findAll: ProviderRatesController.findAll({ProviderRateService}),
    findLast: ProviderRatesController.findLast({ProviderRateService}),
    new: ProviderRatesController.new({ProviderRateService}),
  };
};
