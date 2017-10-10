module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.htmlLint, {
      htmllintrc: task.options.rules,
      useHtmllintrc: true
    })
    .pipe($.htmlLint.format)
});
