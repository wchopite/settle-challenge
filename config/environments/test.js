module.exports = {
  server: {
    name: 'settle-api-test',
    port: process.env.PORT
  },
  DB: {
    dialect: process.env.DB_DIALECT,
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
  },
  providers: {
    default: 'fixerio',
    list: {
      fixerio: {
        baseURL: process.env.FIXER_IO_URL,
        apiKey: process.env.FIXER_IO_API_KEY,
      },
    },
    currencies: ['USD', 'ARS', 'BRL'],
  },
};
