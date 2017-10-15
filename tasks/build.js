module.exports = ($, gulp, config, task) => () => {
  let tasks = [];

  Object.keys(config.tasks).forEach((name) => {
    if (config.tasks[name].pattern || config.tasks[name].related.build) {
      tasks.push(name);
    }
  });

  return $.runSequence('clean', tasks);
}
