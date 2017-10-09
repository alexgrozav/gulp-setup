const browserify = require('browserify');


module.exports = ($, task, options) => {
  let plugins = task.options.browserify;

  options = options || {};
  options.plugins = options.plugins || [];
  options.transforms = options.transforms || [];

  return $.lazypipe()
    .pipe($.through.obj, (file, enc, next) => {
      let bundle = browserify(file.path, options);

      options.plugins.forEach((plugin) => {
        bundle.plugin(plugins[plugin].plugin, plugins[plugin].options || {});
      });

      options.transforms.forEach((plugin) => {
        bundle.transform(plugins[plugin].transform, plugins[plugin].options || {});
      });

      bundle.bundle((err, res) => {
        if (err) {
          $.util.log($.util.colors.red('Syntax Error'), err);
        }

        file.contents = res;
        next(err, file);
      });
    })
    .pipe($.buffer);
}
