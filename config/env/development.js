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
      'assets/js/jquery/jquery',
      'assets/js/bootstrap/bootstrap'
    ]
  }
};
