module.exports = (gulp: any, plugins: any, paths: any) => {
  var srcPath = plugins['path'].join(paths.src, paths.css);

  return () => {
    gulp.src(srcPath)
        .pipe(plugins['cached']('css'))
        .pipe(plugins['debug']())
        .pipe(plugins['plumber']())
        .pipe(gulp.dest(paths.build))
        .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
        .pipe(plugins['cssmin']())
        .pipe(gulp.dest(paths.dist));
  }
}
