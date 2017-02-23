module.exports = (gulp, plugins, paths) => {
  var srcPath = plugins['path'].join(paths.src, paths.css);

  return () => {
    return gulp.src(srcPath)
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['csslint']())
      .pipe(plugins['csslint'].formatter());
  }
}
