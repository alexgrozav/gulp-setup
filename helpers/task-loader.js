let isString = (v) => typeof v === 'string' || v instanceof String


module.exports = ($, gulp, config, task) => {
  if (task.extends) {
    task.base = config.tasks[task.extends].base;
    task.process = config.tasks[task.extends].process;
  }

  if (isString(task.base)) {
    task.base = require(task.base)($, gulp, config, task);
  }

  if (isString(task.process)) {
    task.process = require(task.process)($, gulp, config, task);

    ['init', 'build', 'dist', 'end'].forEach((step) => {
      task.process[step] = task.process[step] || $.util.noop;
    });
  };

  return task.base || task.process;
}
