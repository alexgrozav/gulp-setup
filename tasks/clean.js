module.exports = (gulp, plugins, paths) => {
  var buildPath = plugins['path'].join(paths.build),
      distPath = plugins['path'].join(paths.dist);

  return () => {
    return gulp.src([buildPath, distPath], { read: false })
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['clean']());
  }
}
