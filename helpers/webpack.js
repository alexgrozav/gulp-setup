module.exports = ($, task, options) => $.lazypipe()
  .pipe($.named, (file) => {
    return file.relative.replace(/\.[^\.]+$/, '');
  })
  .pipe($.webpack, task.options.webpack);
