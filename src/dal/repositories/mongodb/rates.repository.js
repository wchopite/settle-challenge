const name = 'rates';
const repo = {
  find(filter = {}, options = {}) {
    const {sort = {timestamp: -1}, skip = 0, projection = {}, limit = 10} = options;

    return this.db.find(filter, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  },
  // TODO: add validation
  update(filter, update, options) {
    return this.db.updateMany(filter, update, options);
  },
  // TODO: add validation
  save(data) {
    return this.db.insertOne(data);
  },
};

module.exports = ({db}) => {
  repo.db = db.collection(name);

  return {
    find: repo.find.bind(repo),
    update: repo.update.bind(repo),
    save: repo.save.bind(repo),
  };
};
