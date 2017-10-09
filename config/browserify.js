const path = require('path');


module.exports = {
  coffeeify: {
    plugin: require('coffeeify')
  },
  tsify: {
    plugin: require('tsify'),
    options: require(path.join(__dirname, 'tsconfig.json'))
  }
};
