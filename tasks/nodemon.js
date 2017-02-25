module.exports = (gulp, plugins, paths) => {
  var buildPath = plugins['path'].join(paths.build),
      distPath = plugins['path'].join(paths.dist);

  return (callback) => {
    var called = false;

    return plugins['nodemon']({
      script: 'server.js',
      ext: 'js',
      env: {
        'NODE_ENV': 'development'
      },
      watch: [
        plugins['path'].join('server.js'),
        plugins['path'].join(paths.config, '**', '*')
      ]
    }).on('start', function () {
      if (!called) {
        called = true;
        callback();
      }
    }).on('restart', function () {
      setTimeout(function () {
        plugins['browser-sync'].reload({ stream: false });
      }, 1000);
    });
  }
}
