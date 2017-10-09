module.exports = ($, gulp, config, task) => {
  const partial = require($.path.join(__dirname, '..', 'helpers', 'partial'))($, task, {
    ext: ['js']
  });


  /**
   * Babel options
   */
  let options = require($.path.join(__dirname, '..', 'config', 'babel'));


  /**
   * Set the same task options as for javascript
   */
  task.options = task.options || config.tasks.javascript.options;


  /**
   * Compile and bundle individual JS files
   */
  let compile = require($.path.join(__dirname, '..', 'helpers', task.options.bundler))($, task, {
    transforms: [
      'coffeeify'
    ]
  });


  return {
    // init: $.lazypipe()
    //   .pipe($.tap, partial.process),

    build: $.lazypipe()
      // .pipe($.ignore, partial.check)
      .pipe(compile)
      .pipe($.babel, options.build),

    dist: $.lazypipe()
      .pipe($.babel, options.dist)
  }
};
