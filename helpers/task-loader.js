module.exports = (gulp, plugins, config, task) => {
  if (typeof task === 'function') {
    return task.task();
  } else if (typeof task === 'object') {
    return task.task;
  } else {
    return require(task.base || task.task)(gulp, plugins, config, task);
  }
}
