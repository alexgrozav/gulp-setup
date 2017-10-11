module.exports = ($, gulp, config, task) => () => {
  Object.keys(config.tasks).forEach((name) => {
    let pattern = config.tasks[name].pattern;

    if(pattern && config.tasks[name].watch !== false) {
      gulp.watch($.path.join(config.paths.src, pattern), [name]);
    }
  });
}
