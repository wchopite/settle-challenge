const name = 'provider_rates';
const repo = {
  find(filter, options) {
    const {sort = {timestamp: -1}, skip = 0, projection = {}, limit = 10} = options;

    return this.db.find(filter, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  },
  findOne(filter) {
    return this.db.find(filter).sort({timestamp: -1}).limit(1).toArray();
  },
  save(data) {
    return this.db.insertOne(data);
  },
};

module.exports = ({db}) => {
  repo.db = db.collection(name);

  return {
    find: repo.find.bind(repo),
    findOne: repo.findOne.bind(repo),
    save: repo.save.bind(repo),
  };
};
