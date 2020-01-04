const path = require('path');
const fs = require('fs');

module.exports = ({config}) => {
  if(fs.existsSync(path.join(__dirname, `${config.DB.dialect}.js`))) {
    return require(`./${config.DB.dialect}.js`)({config: config.DB});
  }
};
