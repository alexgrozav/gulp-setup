module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.stylint, {
      config: task.options.rules
    })
    .pipe($.stylint.reporter);
});
