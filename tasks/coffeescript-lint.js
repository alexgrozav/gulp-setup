module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.coffeelint, task.options.rules)
    .pipe($.coffeelint.reporter);
});
