module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.eslint, task.options.rules)
    .pipe($.eslint.format);
});
