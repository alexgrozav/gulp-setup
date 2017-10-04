module.exports = (gulp, plugins, config, task) => () => {
  let paths = [];
  if (config.build) paths.push(config.build);
  if (config.dist) paths.push(config.dist);

  return () => {
    return gulp.src(paths, { read: false })
      .pipe(plugins['debug']())
      .pipe(plugins['plumber']())
      .pipe(plugins['clean']());
  }
}
