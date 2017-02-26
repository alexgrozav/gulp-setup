const path = require('path');

module.exports = {
  environment: 'development',
  server: {
    baseDir: 'build',
    routes: {
      '/node_modules': 'node_modules'
    }
  },
  assets: require(path.join(__dirname, 'assets.development.json'))
};
