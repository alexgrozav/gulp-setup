module.exports = {
  environment: 'development',
  server: {
    baseDir: 'build',
    routes: {
      '/node_modules': 'node_modules'
    }
  },
  assets: {
    scripts: [
      'polyfill',
      'assets/js/jquery/jquery',
      'assets/js/bootstrap/bootstrap'
    ]
  }
};
