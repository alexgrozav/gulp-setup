module.exports = ($, gulp, config, task) => ({
  dist: $.lazypipe()
    .pipe($.htmlmin)
});
