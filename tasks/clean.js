module.exports = ($, gulp, config, task) => {
  let paths = [];
  if (!!config.paths.build) paths.push(config.paths.build);
  if (!!config.paths.dist) paths.push(config.paths.dist);

  return () => gulp.src(paths, { read: false })
    .pipe($.debug())
    .pipe($.plumber())
    .pipe($.clean());
}
