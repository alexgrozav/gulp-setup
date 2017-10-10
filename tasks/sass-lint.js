module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.sassLint)
    .pipe($.sassLint.format)
});
