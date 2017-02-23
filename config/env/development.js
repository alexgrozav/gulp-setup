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
      'vendor/jquery/jquery',
      'vendor/tether/tether',
      'vendor/bootstrap/bootstrap'
    ],
    stylesheets: [
      'vendor/bootstrap/bootstrap'
    ]
  }
};
