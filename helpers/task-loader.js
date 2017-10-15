const options = require('merge-options');
const isString = (v) => typeof v === 'string' || v instanceof String


module.exports = ($, gulp, config, task) => {
  if (task.extends) {
    task = options(config.tasks[task.extends], task);
  }

  if (isString(task.base)) {
    task.base = require(task.base)($, gulp, config, task);
  }

  if (isString(task.process) || task.base && !task.process) {
    task.process = isString(task.process) ?
      require(task.process)($, gulp, config, task) :
      {};

    ['init', 'build', 'dist', 'end'].forEach((step) => {
      task.process[step] = task.process[step] || $.util.noop;
    });
  }

  return task.base || task.process;
}
