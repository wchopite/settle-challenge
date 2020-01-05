const { createLogger, transports, format } = require('winston');

const log = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  log.add(new transports.Console({
    format: format.simple()
  }));
}

const Logger = {
  info(msg, error = {}) {
    log.info(msg, error);
  },
  warn(msg, error = {}) {
    log.warn(msg, error);
  },
  error(msg, error = {}) {
    log.error(msg, error);
  },
};

module.exports = Logger;
