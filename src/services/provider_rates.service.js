const service = {
  find(filter = {provider:  this.providers.default}, options = {}) {
    return this.ProviderRatesRepository.find(filter, options);
  },
  findOne(filter = {provider:  this.providers.default}) {
    return this.ProviderRatesRepository.findOne(filter);
  },
  async new(data = {provider:  this.providers.default}) {
    const provider = data.provider;

    if (!this.providers.list[provider]) {
      const error = new Error('ProviderNotAllowed');
      return Promise.reject(error);
    }

    let url = this.providers.list[provider].baseURL;
    url += `latest?access_key=${this.providers.list[provider].apiKey}`;
    url += `&symbols=${this.providers.currencies.join(',')}`;

    // TODO: manage a possible error here
    const result = await this.httpClient.get(url);
    const { base, rates } = result.data;
    return this.ProviderRatesRepository.save({provider, timestamp: new Date().valueOf(), base, rates});
  },
};

module.exports = ({config, httpClient, ProviderRatesRepository}) => {
  service.ProviderRatesRepository = ProviderRatesRepository;
  service.providers = config.providers;
  service.httpClient = httpClient;

  return {
    find: service.find.bind(service),
    findOne: service.findOne.bind(service),
    new: service.new.bind(service),
  };
};
