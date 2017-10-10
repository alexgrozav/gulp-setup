module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.csslint)
    .pipe($.csslint.formatter)
});
