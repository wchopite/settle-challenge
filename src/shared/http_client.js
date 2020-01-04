const axios = require('axios');

// TODO: implement others method
const httpClient = {
  get(url)  {
    return axios.get(url);
  },
};

module.exports = httpClient;
