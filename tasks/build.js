module.exports = ($, gulp, config, task) => () => {
  let tasks = [];

  Object.keys(config.tasks).forEach((name) => {
    if (config.tasks[name].pattern) tasks.push(name);
  });

  return $.runSequence('clean', tasks);
}
