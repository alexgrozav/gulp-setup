module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.htmlLint)
    .pipe($.htmlLint.format)
});
