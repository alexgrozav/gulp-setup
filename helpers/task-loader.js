const options = require('merge-options');
const isString = (v) => typeof v === 'string' || v instanceof String


module.exports = ($, gulp, config, task) => {
  // Store task source file paths to be used with extends directive
  //
  task.source = {
    process: task.process,
    base: task.base
  };

  // Extend an existing task by copying its properties and overriding them with
  // the ones specified for the new one
  //
  if (task.extends) {
    task = options(config.tasks[task.extends], task);

    // Set the process and base of the task to the source of the extended task
    // so that we can reload the required task functions
    task.process = config.tasks[task.extends].source.process || config.tasks[task.extends].process;
    task.base = config.tasks[task.extends].source.base || config.tasks[task.extends].base;
  }

  // Load task base function
  //
  if (isString(task.base)) {
    task.base = require(task.base)($, gulp, config, task);
  }

  // Load task process functions
  //
  if (isString(task.process) || task.base && !task.process) {
    task.process = isString(task.process) ?
      require(task.process)($, gulp, config, task) :
      {};

    // Initialize task hooks
    ['init', 'build', 'dist', 'end'].forEach((step) => {
      task.process[step] = task.process[step] || $.util.noop;
    });
  }

  // Replace original task description with the processed one
  //
  config.tasks[task.name] = task;

  return task.base || task.process;
}
