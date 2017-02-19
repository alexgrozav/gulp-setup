module.exports = {
  environment: 'production',
  server: {
    baseDir: 'dist',
    routes: {
      '/node_modules': 'node_modules'
    }
  },
  assets: {
    scripts: [
      'polyfill',
      'main'
    ]
  }
};
