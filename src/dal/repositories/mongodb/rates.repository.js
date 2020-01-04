const name = 'rates';
const repo = {
  find(filter = {}, options = {}) {
    const {sort = {timestamp: -1}, skip = 0, projection = {}, limit = 10} = options;

    return this.db.find(filter, projection)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .toArray();
  }
};

module.exports = ({db}) => {
  repo.db = db.collection(name);

  return {
    find: repo.find.bind(repo),
  };
};
