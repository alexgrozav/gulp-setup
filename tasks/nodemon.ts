module.exports = (gulp: any, plugins: any, paths: any) => {
  var buildPath = plugins['path'].join(paths.build),
      distPath = plugins['path'].join(paths.dist);

  return (callback: any) => {
    var called: boolean = false;

    return plugins['nodemon']({
      script: 'server.js',
      ext: 'js',
      env: {
        'NODE_ENV': 'development'
      },
      watch: [
        plugins['path'].join(paths.src, '**', '*')
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
