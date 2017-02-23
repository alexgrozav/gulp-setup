module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.pug);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['pugLint']());
  }
}
