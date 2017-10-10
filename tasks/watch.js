module.exports = ($, gulp, config, task) => () => {
  Object.keys(config.tasks).forEach((taskName) => {
    let pattern = config.tasks[taskName].pattern;

    if(pattern && config.tasks[taskName].watch !== false) {
      gulp.watch($.path.join(config.src, pattern), [taskName]);
    }
  });
}
