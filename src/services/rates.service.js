const service = {
  async find({provider, pairs}) {
    if (!provider) {
      provider = this.providers.default;
    }

    // build the filter
    let filter = pairs.reduce((obj, pair) => {
      const option = {pair};
      obj.$or.push(option);
      return obj;
    }, {provider, active: true, $or:[]});

    const providerRate = await this.ProviderRatesRepository.findOne({provider});
    const rates = await this.RatesRepository.find(filter, {});

    // TODO: move this logic from here
    const result = rates.map((rate) => {
      let respond = {
        pair: rate.pair,
        fee_percent: rate.fee_percent,
        rate: providerRate[0].rates[rate.dest],
      };
      if (rate.base !== providerRate[0].base) {
        respond.rate = (providerRate[0].rates[rate.dest]/providerRate[0].rates[rate.base]);
      }

      respond.fee_amount = respond.rate * (respond.fee_percent/100);
      respond.total = respond.rate + respond.fee_amount;
      return respond;
    });

    return result;
  }
};

module.exports = ({config, RatesRepository, ProviderRatesRepository}) => {
  service.RatesRepository = RatesRepository;
  service.ProviderRatesRepository = ProviderRatesRepository;
  service.providers = config.providers;

  return {
    find: service.find.bind(service),
  };
};
