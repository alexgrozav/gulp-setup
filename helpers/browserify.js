const browserify = require('browserify');


module.exports = ($, task, options) => $.lazypipe()
  .pipe($.through.obj, (file, enc, next) => {
    browserify(file.path, task.options.browserify).bundle((err, res) => {
      file.contents = res;
      next(err, file);
    });
  })
  .pipe($.buffer);
