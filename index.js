const config = require('./config/config');
const db = require('./src/dal/database/db')({config});
const { httpClient, logger } = require('./src/shared/shared');

const Hapi = require('@hapi/hapi');

// TODO: server should be in a separate file
const server = Hapi.server({
  port: config.server.port,
  host: config.server.host,
  app: {}
});

// TODO: Maybe is a good idea to add another layer with all business logic, instead of use the service layer
const init = async () => {
  try {
    await db.connect();

    // repositories
    const {RatesRepository, ProviderRatesRepository} = require('./src/dal/repositories/mongodb/repositories')({db});

    // services
    const RateService = require('./src/services/rates.service')({config, logger, RatesRepository, ProviderRatesRepository});
    const ProviderRateService = require('./src/services/provider_rates.service')({config, httpClient, ProviderRatesRepository});

    // controllers
    const RatesController = require('./src/api/controllers/rates.controller')({RateService});
    const ProviderRatesController = require('./src/api/controllers/provider_rates.controller')({ProviderRateService});

    // routes
    const routes = require('./src/api/routes/routes')({RatesController, ProviderRatesController});

    await server.register(routes);
    await server.start();
    logger.info(`Server running on port ${config.server.port}`);
  } catch(err) {
    logger.error(err);
    process.exit(1);
  }
};

process.on('unhandledRejection', (err) => {
  logger.error(err);
  process.exit(1);
});

init();
