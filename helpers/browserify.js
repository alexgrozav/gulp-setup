const browserify = require('browserify');


module.exports = ($, task, options) => {
  let transforms = task.options.browserify;

  return $.lazypipe()
    .pipe($.through.obj, (file, enc, next) => {
      let bundle = browserify(file.path, options);
      options.transforms.forEach((transform) => {
        bundle.transform(transforms[transform].transform, transforms[transform].options || {});
      });

      bundle.bundle((err, res) => {
        file.contents = res;
        next(err, file);
      });
    })
    .pipe($.buffer);
}
