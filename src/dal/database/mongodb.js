const MongoClient = require('mongodb').MongoClient;

const mongo = {};

mongo.connect = (url, options) => {
  const client = new MongoClient(url, options);
  return new Promise((resolve, reject) => {
    client.connect(err => {
      if (err) {
        reject(err);
        return;
      }
      console.log('Connected to the database');
      resolve(client.db('settle'));
    });
  });
};

mongo.close = (db) => {
  return db.close();
};

module.exports = ({config}) => {
  let db;

  const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

  return {
    async connect() {
      db = await mongo.connect(config.url, options);
      return db;
    },
    close() {
      mongo.close(db);
      console.log('DB connection closed');
    },
    collection(name) {
      return db.collection(name);
    }
  };
};
