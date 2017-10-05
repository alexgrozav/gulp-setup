module.exports = ($, gulp, config, task) => {
  let paths = [];
  if (!!config.build) paths.push(config.build);
  if (!!config.dist) paths.push(config.dist);

  return () => gulp.src(paths, { read: false })
    .pipe($.debug())
    .pipe($.plumber())
    .pipe($.clean());
}
