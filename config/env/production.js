const path = require('path');

module.exports = {
  environment: 'production',
  server: {
    baseDir: 'dist',
    routes: {
      '/node_modules': 'node_modules'
    }
  },
  assets: require(path.join(__dirname, 'assets.production.json'))
};
