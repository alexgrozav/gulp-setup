module.exports = ($, gulp, config, task) => {
  const partial = require($.path.join(__dirname, '..', 'helpers', 'partial'))($, task, {
    language: 'javascript'
  });


  /**
   * Babel options
   */
  let options = require($.path.join(__dirname, '..', 'config', 'babel'));


  /**
   * Compile and bundle individual JS files
   */
  let compile = require($.path.join(__dirname, '..', 'helpers', task.options.bundler))($, task);


  return {
    init: $.lazypipe()
      .pipe($.tap, partial.process),

    build: $.lazypipe()
      .pipe($.ignore, partial.check)
      .pipe(compile)
      .pipe($.babel, options.build),

    dist: $.lazypipe()
      .pipe($.babel, options.dist)
  }
};
