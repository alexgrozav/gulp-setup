module.exports = ($, gulp, config, task) => () => {
  Object.keys(config.tasks).forEach((name) => {
    let pattern = config.tasks[name].pattern;
    let watch = config.tasks[name].related.watch;

    if (watch !== false && pattern) {
      gulp.watch($.path.join(config.tasks[name].paths.src, pattern), [name]);

      // @TODO Add possibility of specifying additional task watch options,
      //       perhaps overriding?
    }
  });
}
