const path = require('path');


module.exports = {
  coffeeify: {
    transform: require('coffeeify')
  },
  tsify: {
    plugin: require('tsify'),
    options: require(path.join(__dirname, 'tsconfig.json'))
  }
};
