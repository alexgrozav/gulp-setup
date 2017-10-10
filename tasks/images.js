
module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.ignore, (file) => /font.*\.svg$/.test(file.relative))
    .pipe($.imagemin, { verbose: true })
});
