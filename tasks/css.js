module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.css);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['cached']('css'))
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(gulp.dest(paths.build))
      .pipe(plugins['browser-sync'].stream())
      // .pipe(plugins['ignore'].exclude([ '**/*.map' ]))
      // .pipe(plugins['cssmin']())
      // .pipe(gulp.dest(paths.dist));
  }
}
