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
      // 'polyfill',
      'vendors/jquery/jquery',
      'vendors/tether/tether',
      'vendors/bootstrap/bootstrap'
    ],
    stylesheets: [
      'resources/application/application',
      'vendors/bootstrap/bootstrap'
    ]
  }
};
