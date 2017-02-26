module.exports = (gulp, plugins, paths) => {
  const srcPath = plugins['path'].join(paths.src, paths.pug);

  let assets = require(plugins['path'].join(__dirname, '..', 'config', 'env', 'assets.development.json'));
  assets.scripts = assets.scripts.map((file) => {
    return file.substr(0, file.lastIndexOf('.')) + '.js';
  })
  assets.stylesheets = assets.stylesheets.map((file) => {
    return file.substr(0, file.lastIndexOf('.')) + '.css';
  })

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['cached']('pug'))
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['pug']({
        pretty: true,
        locals: {
          assets: assets
        }
      }))
      .pipe(plugins['rename']({
        extname: '.html'
      }))
      .pipe(gulp.dest(paths.build))
      .pipe(plugins['browser-sync'].stream())
      // .pipe(plugins['htmlmin']())
      // .pipe(gulp.dest(paths.dist));
  }
}
