module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.pug);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['cached']('pug'))
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(plugins['pug']({
          pretty: true
        }))
        .pipe(plugins['rename']({
          extname: '.html'
        }))
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['htmlmin']())
        .pipe(gulp.dest(paths.dist));
  }
}
