module.exports = ($, gulp, config, task) => () =>
  $.browserSync.init(task.options);
