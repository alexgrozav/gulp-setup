module.exports = (gulp: any, plugins: any, paths: any) => {
  var buildPath = plugins['path'].join(paths.build),
      distPath = plugins['path'].join(paths.dist);

  return () => {
    return gulp.src([buildPath, distPath], { read: false })
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['clean']());
  }
}
