module.exports = ($, gulp, config, task) => ({
  init: $.lazypipe()
    .pipe($.ignore, (file) => /(img)/.test(file.relative)),
});
