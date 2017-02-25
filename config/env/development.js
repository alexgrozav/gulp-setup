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
      'vendors/jquery/jquery',
      'vendors/bootstrap/bootstrap'
    ],
    stylesheets: [
      'vendors/bootstrap/bootstrap'
    ]
  }
};
