module.exports = ($, gulp, config, task) => {
  let paths = [];
  if (!!config.paths.build) paths.push(config.paths.build);
  if (!!config.paths.dist) paths.push(config.paths.dist);
  if (!!task.pattern) {
    if (task.pattern.constructor === Array) {
      paths = paths.concat(task.pattern);
    } else {
      paths.push(task.pattern);
    }
  }

  return () => gulp.src(paths, { read: false })
    .pipe($.debug())
    .pipe($.plumber())
    .pipe($.clean());
}
