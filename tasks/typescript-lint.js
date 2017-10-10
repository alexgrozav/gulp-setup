module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.tslint, {
      configuration: task.options.rules,
      formatter: 'verbose'
    })
    .pipe($.tslint.report)
});
