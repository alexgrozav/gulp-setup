module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.sassLint, {
      rules: task.options.rules
    })
    .pipe($.sassLint.format)
});
