module.exports = (gulp: any, plugins: any, paths: any) => {
  const srcPath = plugins['path'].join(paths.src, paths.pug);
  const config = require(plugins['path'].join(__dirname, '..', 'config', 'env', 'development.js'));

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['cached']('pug'))
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['pug']({
        pretty: true,
        locals: config
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
