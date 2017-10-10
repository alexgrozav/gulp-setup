module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.pugLint)
});
