// TODO: The Services should not know the database syntax
const service = {
  async find({provider, pairs}) {
    if (!provider) {
      provider = this.providers.default;
    }

    pairs = (!pairs) ? [] : (Array.isArray(pairs)) ? pairs : pairs.split(',');

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
  },
  async new({pair, fee_percent, provider = this.providers.default}) {
    // Objects used update all documents according to filter => active=false
    const filter = {provider, pair};

    const update = {
      $set: {active: false},
    };
    const options = {multi: true};

    // TODO: To improve this
    try {
      await this.RatesRepository.update(filter, update, options);
    } catch(err) {
      this.logger.error(err);
      process.exit(1);
    }

    const base = pair.substring(0, 3);
    const dest = pair.substring(3, 6);
    const timestamp = new Date().valueOf();
    return this.RatesRepository.save({base, dest, pair, fee_percent, timestamp, active: true, provider});
  },
};

module.exports = ({config, logger, RatesRepository, ProviderRatesRepository}) => {
  service.RatesRepository = RatesRepository;
  service.ProviderRatesRepository = ProviderRatesRepository;
  service.providers = config.providers;
  service.logger = logger;

  return {
    find: service.find.bind(service),
    new: service.new.bind(service),
  };
};
