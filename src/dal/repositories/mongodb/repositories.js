module.exports = ({db}) => {
  return {
    RatesRepository: require('./rates.repository.js')({db}),
    ProviderRatesRepository: require('./provider_rates.repository')({db}),
  };
};
