module.exports = ($, gulp, config, task) => () => {
  let tasks = [];

  Object.keys(config.tasks).forEach((name) => {
    if (name.endsWith('-lint')) tasks.push(name);
  });

  return $.runSequence(tasks);
}
