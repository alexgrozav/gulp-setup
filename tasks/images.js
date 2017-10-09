module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.imagemin, { verbose: true })
});
