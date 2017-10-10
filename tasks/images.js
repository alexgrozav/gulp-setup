
module.exports = ($, gulp, config, task) => ({
  build: $.lazypipe()
    .pipe($.ignore, (file) => /(font)/.test(file.relative))
    .pipe($.imagemin, { verbose: true })
});
