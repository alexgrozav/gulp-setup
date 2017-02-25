module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.javascript);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['cached']('javascript'))
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(gulp.dest(paths.build))
      .pipe(plugins['browser-sync'].stream())
      // .pipe(plugins['babel']({ presets: ['babili'] }))
      // .pipe(gulp.dest(paths.dist));
  }
}
